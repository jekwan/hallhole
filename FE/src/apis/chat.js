import api from "./api";

function fetchChatList(success, fail) {
  api.get("chat/rooms").then(success).catch(fail);
}

function fetchChatRoom(id, success, fail) {
  api.get(`chat/room/${id}`).then(success).catch(fail);
}

function fetchChatLog(id, page, size, success, fail) {
  api
    .get(`chat/logs/${id}`, { params: { page: page, size: size } })
    .then(success)
    .catch(fail);
}

function fetchJoinedChatRoom(id, success, fail) {
  api.get(`chat/joinedroom/${id}`).then(success).catch(fail);
}

export { fetchChatList, fetchChatRoom, fetchChatLog, fetchJoinedChatRoom };
