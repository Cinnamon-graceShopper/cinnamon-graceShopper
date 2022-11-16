import { combineReducers, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import allCoffeesReducer from './allCoffees';
import singleCoffeeReducer from './singleCoffee';
import addCartReducer from './Cart';
//import quantityReducer from './orderQuantity';

const reducer = combineReducers({
	auth,
	coffees: allCoffeesReducer,
	coffee: singleCoffeeReducer,
	cart: addCartReducer,
	//quantity: quantityReducer,
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
