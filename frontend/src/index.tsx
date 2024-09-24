import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import i18n from './internalization/i18n';
import App from './App';
import customeTheme from './customeTheme'

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <ThemeProvider theme={customeTheme}>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </I18nextProvider>
  </QueryClientProvider>
  </ThemeProvider>
);
