import api from "./api";

function requestJoin(email, name, pw, success, fail) {
  api
    .post("member/join", {
      email: email,
      name: name,
      pw: pw,
    })
    .then(success)
    .catch(fail);
}

function requestLogin(email, pw, success, fail) {
  api.post("member/login", { email: email, pw: pw }).then(success).catch(fail);
}

export { requestJoin, requestLogin };
