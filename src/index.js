import {hydrate, render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import Loadable from 'react-loadable';
import createStore from './store/createStore';
import Routes from './Routes';
import {actionCreators} from './store/UserState';
import {Frontload} from 'react-frontload';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import './App.css';

const {store, history} = createStore();

store.dispatch(actionCreators.loadCookies());

const Application = (
    <Provider store={store}>
        <Router history={history}>
            <Frontload noServerRender={true}>
                <Routes/>
            </Frontload>
        </Router>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root);
}
