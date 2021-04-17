import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPageContainer from './container/MainPageContainer';
import ToastMessageProvider from "../src/lib/contexts/message_context";
import MROTheme from './theme';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={MROTheme}>
          <ToastMessageProvider>
            <MainPageContainer />
          </ToastMessageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
