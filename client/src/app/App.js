import React from 'react';
import Header from './components/Header/Header.js';
import LandingPage from './pages/landing-page/LandingPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
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
      </>
    );
  }
}

export default App;
