import React, { useState, useEffect } from 'react';
import {
  ModalPageHeader,
  PanelHeaderButton,
  FormLayout,
  FormItem,
  Button,
  ScreenSpinner,
  Spacing,
  RadioGroup,
  Radio,
  Footnote,
  Input,
  usePlatform,
  Platform
} from '@vkontakte/vkui';
import { Icon28CancelOutline, Icon24Dismiss } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

import { uploadToVKDoc } from '../utils/api.js';
import { blobToFile } from '../utils/utils.js';
import dispatchEvent from '../AppContext.js';

const SaveModal = ({ data, onClosed }) => {
  const platform = usePlatform();

  const [codeName, setCodeName] = useState("");
  const [saveDesc, setSaveDesc] = useState(Window.isMobileVKClient ? 'vk' : 'local');

  useEffect(() => {
    console.log(`Save modal.`);
  }, []);

  const saveCode = () => {
    if (codeName.length === 0) return;
    if (saveDesc === 'vk') {
      saveOnVK();
    } else {
      download();
    }
  };

  const saveOnVK = () => {
    let file = blobToFile(new Blob([data], {type: "application/json"}), `${codeName}.json`);
    dispatchEvent("onShowPopoutRequested", (<ScreenSpinner state="loading" />));
    uploadToVKDoc(`${codeName}.json`, file).then((success) => {
      dispatchEvent("onShowPopoutRequested", null);
      onClosed();
    }).catch((error) => {
      dispatchEvent("onShowPopoutRequested", null);
      console.log(error);
      alert(error);
    });
  };

  const download = () => {
    try {
      if (!Window.isMobileVKClient) {
        let file = new Blob([data], {type: "application/json"});
        let a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = codeName + ".json";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      } else {
        alert("Download in mobile clients is not ready yet!");
      }
    } catch (e) {
      alert(e);
    }
    onClosed();
  };

  return (<React.Fragment>
      <ModalPageHeader
      before={
        <React.Fragment>
          {(platform === Platform.ANDROID) && (
            <PanelHeaderButton onClick={onClosed}>
              <Icon28CancelOutline />
            </PanelHeaderButton>
          )}
        </React.Fragment>
      }
      after={
        <React.Fragment>
          {platform === Platform.IOS && (
            <PanelHeaderButton onClick={onClosed}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          )}
        </React.Fragment>
      }
    >
      Сохранение кода
    </ModalPageHeader>
    <FormLayout>
      <FormItem>
        <Footnote style={{ color: "var(--vkui--color_text_subhead)" }}>Вы можете сохранить код в файлах ВК, либо скачать на своё устройство</Footnote>
      </FormItem>
      <FormItem>
        <Input value={codeName} onChange={(e) => setCodeName(e.target.value)} placeholder="Введите имя файла"/>
      </FormItem>
      <FormItem><RadioGroup>
        <Radio disabled={Window.isMobileVKClient} onChange={(e) => setSaveDesc(e.target.value)} name="destination" value="local" defaultChecked={!Window.isMobileVKClient}>На устройстве</Radio>
        <Radio onChange={(e) => setSaveDesc(e.target.value)} name="destination" value="vk" defaultChecked={Window.isMobileVKClient}>В файлах ВК</Radio>
      </RadioGroup></FormItem>
      <FormItem>
        <Button size="l" mode="primary" stretched onClick={saveCode}>Сохранить</Button>
      </FormItem>
      <Spacing size={4}/>
    </FormLayout>
  </React.Fragment>);
};

export default SaveModal;