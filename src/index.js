/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from "./components/app/app";
import reducer from './reducer';


const store = createStore(reducer, applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
<App />
</Provider>,
 document.getElementById("root"));