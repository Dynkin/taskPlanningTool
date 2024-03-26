import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#000000',
      },
    }}
  >
    <StyleProvider hashPriority='high'>
      <App />
    </StyleProvider>
  </ConfigProvider>
);
