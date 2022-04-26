import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./reducer";

//const rootReducer = user;

const store = createStore(user, applyMiddleware(thunk));

export default store;
