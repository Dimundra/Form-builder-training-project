import React from 'react';
import LandingPage from './pages/landing-page/LandingPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

let theme = createTheme();
theme = responsiveFontSizes(theme);

class App extends React.Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <LandingPage />
              </Route>
              <Route path='/sign-up'>
                <SignUpPage />
              </Route>
              <Route path='/sign-in'>
                <SignInPage />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
