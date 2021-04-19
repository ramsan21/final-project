import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ToastMessage from './component/Universal/toast-message';
import MainPageContainer from './container/MainPageContainer';
import ToastMessageProvider from "./lib/contexts/message.context";
import MROTheme from './theme';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={MROTheme}>
          <ToastMessageProvider>
            <MainPageContainer />
            <ToastMessage />
          </ToastMessageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
