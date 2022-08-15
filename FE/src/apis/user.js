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

function requestName(idTag, success, fail) {
  api.get("member/my-name", { params: { tag : idTag } }).then(success).catch(fail);
}

// 유저 정보 수정
function userEditProfile(birth, email, gender, idTag, name, profile, success, fail) {
  api.put("member", {
    birth: birth,
    email: email,
    gender: gender,
    idTag: idTag,
    name: name,
    profile: profile,
  }).then(success).catch(fail);
}

// 회원 탈퇴
function deleteProfile(success, fail) {
  api.put("member/out").then(success).catch(fail);
}

export { requestJoin, requestLogin, requestMyInfo, requestUserInfo, requestName, userEditProfile, deleteProfile };
