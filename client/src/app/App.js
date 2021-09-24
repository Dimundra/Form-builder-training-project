import React from 'react';
import Header from './components/Header/Header.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import MainCabinetPage from './pages/MainCabinetPage/MainCabinetPage.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
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
            <Route path='/cabinet'>
              <MainCabinetPage />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
