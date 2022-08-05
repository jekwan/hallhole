import axios from "axios";

const ApiInstance = () => {
  return axios.create({
    baseURL: "https://i7a401.p.ssafy.io:8081/",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { ApiInstance };
