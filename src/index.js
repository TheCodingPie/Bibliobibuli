import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import App from './client/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
//joksoooks
ReactDOM.render(<App />, document.getElementById('root'));
//drugi komentar
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
