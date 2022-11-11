import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import user from "./user";
import allCoffeesReducer from "./allCoffees";
import singleCoffeeReducer from "./singleCoffee";

const reducer = combineReducers({
	auth,
	user,
	coffees: allCoffeesReducer,
	coffee: singleCoffeeReducer,
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
