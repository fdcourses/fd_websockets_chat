import {createStore, applyMiddleware} from 'redux';
import createSagaMW from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMW = createSagaMW();

const store = createStore(rootReducer, applyMiddleware(sagaMW));

sagaMW.run(rootSaga);

export default store;