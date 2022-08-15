import api from "./api";

function getReviewInfo(reviewId, success, fail) {
  api.get(`review/${reviewId}`).then(success).catch(fail);
}

function editReview(contents, performanceId, performance_time, star, title, writerTag, success, fail) {
  api
    .post("review/write", {
      contents: contents,
      performanceId: performanceId,
      performance_time: performance_time,
      star: star,
      title: title,
      writerTag: writerTag,
    })
    .then(success)
    .catch(fail);
}

function deleteReview(reviewId, writerTag, success, fail) {
  api
    .put(`review/${reviewId}`,  { writerTag: writerTag } )
    .then(success)
    .catch(fail);
}

function getPerformanceReviewList(performanceId, size, start, success, fail) {
  api
    .post("review/performance-review-list", { performance_id: performanceId, size: size, start: start })
    .then(success)
    .catch(fail);
}

function getReviewCommentCnt(reviewId, success, fail) {
  api.get(`review/comment-cnt/${reviewId}`).then(success).catch(fail)
}

function getUserReviewList(size, start, writerTag, success, fail) {
  api
    .post("review/user-review-list", { size: size, start: start, writerTag: writerTag })
    .then(success)
    .catch(fail);
}

function writeReview(contents, performanceId, performance_time, star, title, writerTag, success, fail) {
  api
    .post("review/write", {
      contents: contents,
      performanceId: performanceId,
      performance_time: performance_time,
      star: star,
      title: title,
      writerTag: writerTag,
    })
    .then(success)
    .catch(fail);
}

export { getReviewInfo, editReview, deleteReview, getPerformanceReviewList, getUserReviewList, writeReview, getReviewCommentCnt };
