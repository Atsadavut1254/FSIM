import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import rootReducer from './redux/reducers';
import logger from 'redux-logger'
import thunk from "redux-thunk";

// import route tool
import { BrowserRouter } from 'react-router-dom'

// import css tool
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const AppWithRouter = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
