/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from "react-dom";
// import { Provider } from "react-redux";
import App from './components/App';
// import store from './store';
import './stylesheets/index.scss';

// ReactDOM.render(
//   // wrap the App in the Provider and pass in the store
//   <Provider store={store}>
//     <App />
//     ,
//   </Provider>,
//   document.getElementById('contents')
// );

ReactDOM.render(<App />, document.getElementById('contents'));
