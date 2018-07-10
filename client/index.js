import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import footer from './theme/footer';
import 'web-animations-js'; // eslint-disable-line
import store from './store';
import theme from './theme';
import Routes from './routes';

// establishes socket connection
import './socket';
// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    background-color: ${footer.backgroundColor};
  }
  #app {
    height: 100%;
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CookiesProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </CookiesProvider>
  </ThemeProvider>,
  document.getElementById('app'), //eslint-disable-line
);
