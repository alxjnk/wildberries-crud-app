import { createStore, applyMiddleware, compose } from 'redux';
import history from './history';

import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enchancer = applyMiddleware();

export default function configureStore(initialState) {
	return createStore(reducer(history), initialState, composeEnhancers(enchancer));
}
