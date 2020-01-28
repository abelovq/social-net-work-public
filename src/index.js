import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';

import { Provider } from 'react-redux';

import reducer from './store/reducers';
import rootSaga from './store/sagas';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import Login from './pages/Login';

const history = createBrowserHistory(); 

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer, 
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

sagaMiddleware.run(rootSaga)
 
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={props =>
            localStorage.getItem('authToken') ? 
                <Component {...props} />
                :
                <Redirect to="/login" />
        }
        />
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Signup} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/main" component={Main} />
                <Redirect from='*' to="/" />
            </Switch>
        </Router>
    </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { history };
