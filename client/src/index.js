import React from 'react';
import ReactDOM from 'react-dom';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './app/store/index.js';
import App from './app/App.js';

// from redux
const store = createStore(rootReducer, applyMiddleware(thunk));

// from material
let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
