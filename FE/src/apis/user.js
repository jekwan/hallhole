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

function requestMyInfo(success, fail) {
  api.get("member/my-info").then(success).catch(fail);
}

function requestUserInfo(idTag, success, fail) {
  api.get(`member/info/${idTag}`).then(success).catch(fail);
}

function requestName(tag, success, fail) {
  api.get("member/my-name", { tag: tag }).then(success).catch(fail);
}

export { requestJoin, requestLogin, requestMyInfo, requestUserInfo, requestName };
