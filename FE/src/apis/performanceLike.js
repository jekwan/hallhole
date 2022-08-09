import api from "./api";

// 공연 좋아요
function likePerformance(memberTag, performanceId, success, fail) {
  api.post("plike/add", { memberTag: memberTag, performanceId: performanceId }).then(success).catch(fail);
}

// 공연 좋아요 해제
function unlikePerformance(memberTag, performanceId, success, fail) {
  api.post("plike/sub", { memberTag: memberTag, performanceId: performanceId }).then(success).catch(fail);
}

// 공연별 좋아요 수
function howManyLikePerformance(id, success, fail) {
  api.get(`plike/${id}`).then(success).catch(fail);
}

function checkLikeStatus(id, userTag, success, fail) {
  api.get(`plike/${id}/${userTag}`).then(success).catch(fail);
}

// 유저별 좋아요 페이징
function pickedPerformance(params, success, fail) {
  api.get(`plike/list`, { params: params }).then(success).catch(fail);
}

// 좋아요가 높은 공연
function mostLikedPerformance(size, success, fail) {
  api.get(`plike/popular/${size}`).then(success).catch(fail);
}

export {
  likePerformance,
  unlikePerformance,
  howManyLikePerformance,
  checkLikeStatus,
  pickedPerformance,
  mostLikedPerformance,
};
