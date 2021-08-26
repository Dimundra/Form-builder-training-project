import React from 'react';
import LandingPage from './pages/landing-page/LandingPage.js';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import './App.scss';

let theme = createTheme();
theme = responsiveFontSizes(theme);

class App extends React.Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <LandingPage />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
