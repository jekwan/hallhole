import api from "./api";

function requestTweet(success, fail) {
  api.get("twitter").then(success).catch(fail);
}

export { requestTweet };
