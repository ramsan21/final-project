import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPageContainer from './container/MainPageContainer';
import MROTheme from './theme';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={MROTheme}>
          <MainPageContainer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
