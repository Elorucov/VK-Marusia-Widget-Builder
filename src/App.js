import React, { useState, useEffect, useMemo } from 'react';
import {
  AppRoot, SplitLayout, SplitCol,
  View, Panel, PanelHeader, PanelHeaderButton,
  Div, Link, Button, ButtonGroup,
  ActionSheet, ActionSheetItem, ActionSheetDefaultIosCloseItem,
  ModalRoot, ModalCard, ModalPage,
  Input, FormStatus, Subhead,
  Tabbar, TabbarItem, Spacing,
  useAppearance, useAdaptivityWithJSMediaQueries,
  ViewWidth
} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import { Icon16Add, Icon16FolderOutline, Icon16BookmarkOutline, Icon16HelpOutline,
         Icon28AddOutline, Icon28FolderOutline, Icon28BookmarkAddOutline, 
         Icon28WriteOutline, Icon28ListBulletSquareOutline, Icon28HelpOutline,
         Icon56InfoOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

import UniversalWidget from './widgetComponents/UniversalWidget.js';
import HelpModal from './modals/HelpModal.js';
import SaveModal from './modals/SaveModal.js';
import VKFilesModal from './modals/VKFilesModal.js';
import { getWidgetByType } from './Templates.js';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

Window.timer = null;
Window.isMobileVKClient = false;
const App = () => {
  const appearance = useAppearance();
  const { viewWidth } = useAdaptivityWithJSMediaQueries();

  const [popout, setPopout] = useState(null);
  const [modal, setModal] = useState("welcomeModal");
  const [currentColumn, setCurrentColumn] = useState(0);
  const [errorInfo, setErrorInfo] = useState(null);
  const onClose = () => setPopout(null);

  const [jsonMarkup, setJsonMarkup] = useState('');
  const [widget, setWidget] = useState({});

  const onJSONChange = newValue => {
    setJsonMarkup(newValue);
  }

  const createNewWidget = (type) => {
    let temp = getWidgetByType(type);
    let parsed = JSON.parse(temp);
    setJsonMarkup(JSON.stringify(parsed, null, 4));
    setWidget(parsed);
  };

  useEffect(() => {
    document.addEventListener("onShowPopoutRequested", (e) => {
      setPopout(e.detail);
    });

    console.log(`viewWidth: ${viewWidth}.`);
    createNewWidget("internal");

    bridge.send('VKWebAppGetClientVersion')
      .then((data) => { 
        if (data.platform) {
          console.log(data);
          Window.isMobileVKClient = data.platform == 'ios' || data.platform == 'android';
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
    }, []);

  useEffect(() => {
    if (Window.timer) clearTimeout(Window.timer);
    Window.timer = setTimeout(() => {
      setErrorInfo(null);
      let result = parseJsonSafely(jsonMarkup, (e) => {
        setErrorInfo(<FormStatus mode="error" header="Ошибка!">{e.message}</FormStatus>);
      });
      setWidget(result);
    }, 500);
  }, [jsonMarkup]);

  useEffect(() => {}, [popout, modal, errorInfo]);

  const baseTargetRef = React.useRef();
  const baseTargetRef2 = React.useRef();

  const openBase = () => setPopout(
    <ActionSheet
      header="Выберите шаблон виджета"
      onClose={onClose}
      toggleRef={baseTargetRef}
      iosCloseItem={<ActionSheetDefaultIosCloseItem />}>
      <ActionSheetItem autoClose onClick={() => createNewWidget("card")}>Card</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("counter")}>Counter</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("grid")}>Grid</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("informer")}>Informer</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("internal")}>Internal</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("placeholder")}>Placeholder</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("scroll")}>Scroll</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => createNewWidget("table")}>Table</ActionSheetItem>
    </ActionSheet>,
  );

  const openLoad = () => setPopout(
    <ActionSheet
      header="Открыть..."
      onClose={onClose}
      toggleRef={baseTargetRef2}
      iosCloseItem={<ActionSheetDefaultIosCloseItem />}>
      <ActionSheetItem autoClose onClick={() => openSavedCodes()}>С устройства</ActionSheetItem>
      <ActionSheetItem autoClose onClick={() => setModal('vkFilesModal')}>Из файлов ВК</ActionSheetItem>
    </ActionSheet>,
  );

  const openSavedCodes = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      let file = e.target.files[0];
      let name = file.name;
      if (name.endsWith(".json")) {
        name = name.slice(0, name.length - 5);
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            let parsed = JSON.parse(content);
            setJsonMarkup(JSON.stringify(parsed, null, 4));
            setWidget(parsed);
        };
      } else {

      }
    };
    input.click();
  };

  const setJsonMarkupRaw = (content) => {
    setModal(null);
    if (typeof content !== "string") return;
    console.log(`Content: ${content}`);
    let parsed = JSON.parse(content);
    setJsonMarkup(JSON.stringify(parsed, null, 4));
    setWidget(parsed);
  };

  const openHelp = () => setModal("helpModal");

  const modals = (<ModalRoot activeModal={modal} onClose={() => setModal(null)}>
    <ModalCard 
      id="welcomeModal"
      icon={<Icon56InfoOutline/>}
      header="Добро пожаловать!"
      actions={<Button
            size="l"
            mode="primary"
            stretched
            onClick={() => setModal(null)}>Понятно</Button>}>
            <Subhead className="vkuiModalCardBase__subheader vkuiInternalModalCardBase__subheader">
              Сначала ознакомьтесь с {<Link href="https://dev.vk.com/marusia/widgets" target="_blank">официальной</Link>} и {<Link href="https://elor.top/vk_widgets" target="_blank">подробной</Link>} документациями.<br/>Если встретите баг или возникнут вопросы, напишите {<Link href="https://vk.me/sakwidget" target="_blank">разработчику</Link>}.
            </Subhead>
    </ModalCard>
    <ModalPage id="helpModal">
      <HelpModal onClosed={() => setModal(null)}/>
    </ModalPage>
    <ModalPage id="saveModal">
      <SaveModal data={jsonMarkup} onClosed={() => setModal(null)}/>
    </ModalPage>
    <ModalPage id="vkFilesModal" settlingHeight={100}>
      <VKFilesModal onClosed={setJsonMarkupRaw}/>
    </ModalPage>
  </ModalRoot>);

  const openSaveCodeModal = () => {
    setModal("saveModal");
  };

  const parseJsonSafely = (json, errCallback) => {
    try {
      return JSON.parse(jsonMarkup);
    } catch (e) {
      errCallback(e);
      return {};
    }
  };

  const MobilePanelHeader = () => {
    return viewWidth < ViewWidth.SMALL_TABLET && (<PanelHeader before={
      <React.Fragment>
        <PanelHeaderButton onClick={openBase} aria-label="Создать">
          <Icon28AddOutline />
        </PanelHeaderButton>
        <PanelHeaderButton onClick={openLoad} aria-label="Открыть">
          <Icon28FolderOutline />
        </PanelHeaderButton>
        <PanelHeaderButton onClick={openSaveCodeModal} aria-label="Сохранить">
          <Icon28BookmarkAddOutline />
        </PanelHeaderButton>
        <PanelHeaderButton onClick={openHelp} aria-label="Помощь">
          <Icon28HelpOutline />
        </PanelHeaderButton>
      </React.Fragment>}>
    </PanelHeader>)
  };

  const MobileTabbar = () => {
    return viewWidth < ViewWidth.SMALL_TABLET && (<Tabbar mode="horizontal" shadow={true} style={{ position: "relative" }}>
      <TabbarItem selected={currentColumn === 0} onClick={() => setCurrentColumn(0)} text="Код">
        <Icon28WriteOutline />
      </TabbarItem>
      <TabbarItem selected={currentColumn === 1} onClick={() => setCurrentColumn(1)} text="Предпросмотр">
        <Icon28ListBulletSquareOutline />
      </TabbarItem>
    </Tabbar>)
  };

  return (
    <AppRoot>
      <SplitLayout popout={popout} modal={modals}>
        {(viewWidth >= ViewWidth.SMALL_TABLET || currentColumn === 0) && <SplitCol width="100%">
          <View activePanel="code">
            <Panel id="code">
              <MobilePanelHeader/>
              <div style={{ height: "100%", display: "flex", flexDIrection: "column", justifyContent: "stretch", flexGrow: "2" }}>
                <AceEditor
                  style={{ flexGrow: "2" }}
                  height="unset"
                  mode="json"
                  theme={appearance === 'light' ? 'github' : 'monokai'}
                  onChange={onJSONChange}
                  name="ELOR_ACE"
                  value={jsonMarkup}
                  onKeyDown={() => console.log("keydown")}
                  editorProps={{ $blockScrolling: true }} setOptions={{ showPrintMargin: false }} />
              </div>
              <MobileTabbar/>
            </Panel>
          </View>
        </SplitCol>}
        {(viewWidth >= ViewWidth.SMALL_TABLET || currentColumn === 1) && <SplitCol width="100%" maxWidth={viewWidth >= ViewWidth.SMALL_TABLET && "384px"}>
          <View activePanel="preview">
            <Panel id="preview">
              <MobilePanelHeader/>
              <Div className="im-mess-stack" style={{ fontFamily: "VK Sans Text", flexGrow: "1" }}>
                <UniversalWidget widget={widget}/>
                {errorInfo}
              </Div>
              {viewWidth >= ViewWidth.SMALL_TABLET && <div>
                <Spacing />
                  <ButtonGroup mode="horizontal" gap="none" stretched className="less_padding">
                    <Button getRootRef={baseTargetRef} size="m" stretched mode="tertiary" onClick={openBase} before={<Icon16Add />}>Создать</Button>
                    <Button getRootRef={baseTargetRef2} size="m" stretched mode="tertiary" onClick={openLoad} before={<Icon16FolderOutline />}>Открыть</Button>
                    <Button onClick={openSaveCodeModal} size="m" stretched mode="tertiary" before={<Icon16BookmarkOutline />}>Сохранить</Button>
                    <Button size="m" mode="tertiary" onClick={openHelp} before={<Icon16HelpOutline />} style={{ width: "46px" }} aria-label="Помощь"/>
                  </ButtonGroup>
                <Spacing />
              </div>}
              <MobileTabbar/>
            </Panel>
          </View>
        </SplitCol>}
      </SplitLayout>
    </AppRoot>);
};

export default App;