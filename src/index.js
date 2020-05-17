import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/order';
import builderReducer from './store/reducers/builderReducer';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    builder: builderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store = {store} >
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
