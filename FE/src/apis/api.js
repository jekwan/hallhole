import axios from "axios";

import store from "../configs/store";
store.subscribe(listener);

function select(state) {
  return state.user.token;
}

function listener() {
  let token = select(store.getState());
  if (token) axios.defaults.headers.common["token"] = token;
}

// configuration
const api = axios.create({
  baseURL: "https://i7a401.p.ssafy.io:8081/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
