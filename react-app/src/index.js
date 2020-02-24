import React from 'react';
import ReactDom from 'react-dom';
import App from './App'
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux'


ReactDom.render(<App />, document.getElementById("root"));