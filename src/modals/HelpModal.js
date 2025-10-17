import React, { useState, useEffect } from 'react';
import {
  ModalPageHeader,
  PanelHeaderButton,
  Div,
  SimpleCell,
  Separator,
  Footnote,
  Caption,
  Link,
  useModalRootContext,
  usePlatform,
  Platform
} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import { Icon28DocumentListOutline, Icon28DocumentTextOutline, Icon28MessagesOutline, Icon28CancelOutline, Icon24Dismiss } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

const HelpModal = ({ id, onClosed }) => {
  const { updateModalHeight } = useModalRootContext();

  const platform = usePlatform();

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
      Помощь
    </ModalPageHeader>
    <SimpleCell before={<Icon28DocumentTextOutline fill="var(--vkui--color_icon_accent)"/>}
      onClick={() => window.open("https://dev.vk.com/marusia/widgets", '_blank').focus()}
      subtitle="на сайте dev.vk.com (неполная)">
      Официальная документация по виджетам
    </SimpleCell>
    <SimpleCell before={<Icon28DocumentListOutline fill="var(--vkui--color_icon_accent)"/>}
      onClick={() => window.open("https://elor.top/vk_widgets", '_blank').focus()}
      subtitle="Всё, что отсутствует в официальной документации">
      Подробная документация
    </SimpleCell>
    <SimpleCell before={<Icon28MessagesOutline fill="var(--vkui--color_icon_accent)"/>}
      onClick={() => window.open("https://vk.me/sakwidget", '_blank').focus()}
      subtitle="Сообщите об ошибках">
      Обратная связь
    </SimpleCell>
    <Separator/>
    <Div>
      <Footnote style={{ color: "var(--vkui--color_text_subhead)", textAlign: "center" }}>С любовью и багами, <Link style={{ color: "var(--vkui--color_text_subhead)" }} href="https://vk.com/elorucov" target="_blank">@elorucov</Link></Footnote>
      <Caption level="1" style={{ color: "var(--vkui--color_text_secondary)", textAlign: "center" }}>VK widget builder v{process.env.REACT_APP_VERSION}</Caption>
    </Div>
  </React.Fragment>);
};

export default HelpModal;