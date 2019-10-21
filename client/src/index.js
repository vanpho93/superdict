import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PersistGate } from 'redux-persist/integration/react'
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import { store, persistor } from './redux/store'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
  , rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
