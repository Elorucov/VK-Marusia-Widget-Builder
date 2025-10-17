import React, { useState, useEffect } from 'react';
import {
  ModalPageHeader,
  PanelHeaderButton,
  ScreenSpinner,
  Button,
  SimpleCell,
  Separator,
  Spacing,
  Spinner,
  Placeholder,
  Footnote,
  Input,
  useModalRootContext,
  usePlatform,
  Platform
} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import { Icon28DocumentTextOutline, Icon28CancelOutline, Icon24Dismiss, Icon56ErrorOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

import { callAPIMethod } from '../utils/api.js';
import { prettyDate } from '../utils/utils.js';
import corsFetch from '../utils/corsFetch.js';
import dispatchEvent from '../AppContext.js';

const VKFilesModal = ({ onClosed }) => {
  const { updateModalHeight } = useModalRootContext();
  const platform = usePlatform();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);


  useEffect(() => {
    console.log(`VK files modal.`);
    getFiles();
	updateModalHeight();
  }, []);

  const getFiles = () => {
    setError(null);
    setIsLoading(true);
    callAPIMethod("docs.search", { "q": "vk_widget_code", "search_own": "1", "type": "8" })
    .then((response) => {
      console.log(response.items);
      setFiles(response.items);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setFiles([]);
      setIsLoading(false);
      setError(error);
    });
  };

  const getNormalFileInfo = (date, size) => {
    let normalSize = size >= 1024 ? size / 1024 : size;
    normalSize = Math.round(normalSize, 2);
    normalSize += size >= 1024 ? " Kb" : " b";
    return `${normalSize}, ${prettyDate(date)}`;
  };

  const getContent = (url) => {
    dispatchEvent("onShowPopoutRequested", (<ScreenSpinner state="loading" />));
    corsFetch(url).then(async (response) => {
      if (response.ok) {
        let text = await response.text();
        onClosed(text);
      } else {
        let errorInfo = await response.text();
        alert(`Ошибка HTTP: ${response.status}\n${errorInfo}`);
      }
      dispatchEvent("onShowPopoutRequested", null);
    }).catch((error) => { 
      console.log(error);
      alert("Ошибка: " + error);
      dispatchEvent("onShowPopoutRequested", null);
    });
  };

  return (<React.Fragment>
      <ModalPageHeader
      before={
        <React.Fragment>
          {(platform === Platform.ANDROID) && (
            <PanelHeaderButton onClick={() => onClosed(null)}>
              <Icon28CancelOutline />
            </PanelHeaderButton>
          )}
        </React.Fragment>
      }
      after={
        <React.Fragment>
          {platform === Platform.IOS && (
            <PanelHeaderButton onClick={() => onClosed(null)}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          )}
        </React.Fragment>
      }
    >
      Файлы в ВК
    </ModalPageHeader>
    {isLoading && <Spinner size="medium" style={{ height: "72px" }}/>}
    {error && <Placeholder header="Ошибка" icon={<Icon56ErrorOutline />} action={<Button size="m" onClick={() => getFiles()}>Повторить попытку</Button>}>
      {`${error.error_data.error_code}: ${error.error_data.error_msg}`}
    </Placeholder>}
    {files.map(file => {
      const info = getNormalFileInfo(file.date, file.size);

      return (<SimpleCell key={file.id} before={<Icon28DocumentTextOutline fill="var(--vkui--color_icon_accent)"/>}
        onClick={() => getContent(file.url)}
        subtitle={info}>
        {file.title}
      </SimpleCell>);
    })}
  </React.Fragment>);
};

export default VKFilesModal;