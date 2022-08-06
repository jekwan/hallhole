import { combineReducers, createStore } from "redux";

import counter from "../stores/counter";
import todos from "../stores/todos";
import user from "../stores/user";

const rootReducer = combineReducers({
  counter,
  todos,
  user,
});

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
