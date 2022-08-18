import axios from "axios";

import storage from "../helper/storage";

// configuration
const api = axios.create({
  baseURL: "https://i7a401.p.ssafy.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const token = storage.get("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
