import { combineReducers, createStore } from "redux";

import counter from "../stores/counter";
import todos from "../stores/todos";
import user from "../stores/user";
import chat from "../stores/chat";

const rootReducer = combineReducers({
  counter,
  todos,
  user,
  chat,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
