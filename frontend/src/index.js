import React from 'react';
import ReactDOM from 'react-dom';
import Reactbootstrap from "react-bootstrap";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import bootstrap set
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import $ from 'jquery'
import Popper from 'popper.js'

// import route tool
import { BrowserRouter } from 'react-router-dom'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const AppWithRouter = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

ReactDOM.render(<AppWithRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
