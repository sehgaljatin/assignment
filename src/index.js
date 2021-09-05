import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Home from './container/Home/index'
import { Provider } from 'react-redux';
import store from './container/Home/store/index';


ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.getElementById('root')
);