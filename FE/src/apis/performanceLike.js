import api from "./api";

// 공연 좋아요
function likePerformance(params, success, fail) {
  api.post("plike", { params: params }).then(success).catch(fail);
}

// 공연 좋아요 해제
function unlikePerformance(params, success, fail) {
  api.delete("plike", { params: params }).then(success).catch(fail);
}

// 공연별 좋아요 수
function howManyLikePerformance(id, success, fail) {
  api.get(`plike/${id}`).then(success).catch(fail);
}

// 유저별 좋아요 페이징
function pickedPerformance(params, success, fail) {
  api.get(`plike/list`, { params: params }).then(success).catch(fail);
}

// 좋아요가 높은 공연
function mostLikedPerformance(size, success, fail) {
  api.get(`plike/popular/${size}`).then(success).catch(fail);
}

export { likePerformance, unlikePerformance, howManyLikePerformance, pickedPerformance, mostLikedPerformance };
