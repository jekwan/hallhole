import api from "./api";

function fetchChatList(success, fail) {
  api.get("chat/rooms").then(success).catch(fail);
}

function fetchChatRoom(id, success, fail) {
  api.get(`chat/room/${id}`).then(success).catch(fail);
}

function fetchChatLog(id, success, fail) {
  api.get(`chat/logs/${id}`).then(success).catch(fail);
}

function fetchChatJoin(id, success, fail) {
  api.get(`chat/joinedroom/${id}`).then(success).catch(fail);
}

export { fetchChatList, fetchChatRoom, fetchChatLog, fetchChatJoin };
