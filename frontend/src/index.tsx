import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import i18n from './internalization/i18n';
import App from './App';
import customeTheme from './customeTheme';

const rootElement = document.getElementById('app');

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ThemeProvider theme={customeTheme}>
      <I18nextProvider i18n={i18n}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </I18nextProvider>
    </ThemeProvider>
  );
} else {
  console.error('Ошибка в rootElement');
}
