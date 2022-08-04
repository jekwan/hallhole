import { combineReducers, createStore } from "redux";
import counter from "../states/counter";
import todos from "../states/todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default createStore(rootReducer);
