import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  AdaptivityProvider,
  ConfigProvider
} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import App from './App';
import '@vkontakte/vkui/dist/vkui.css';

// Init VK  Mini App
bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>
    <AdaptivityProvider hasPointer>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);