import api from "./api";

function deleteComment(commentId, idTag, success, fail) {
  api.post("comment/delete", { commentId: commentId, idTag: idTag }).then(success).catch(fail);
}

function getUserCommentList(idTag, size, start, success, fail) {
  api.post("comment/member-list", { idTag: idTag, size: size, start: start }).then(success).catch(fail);
}

function getReviewCommentList(reviewId, size, start, success, fail) {
  api.post("comment/review-list", { reviewId: reviewId, size: size, start: start }).then(success).catch(fail);
}

function editComment(commentId, contents, idTag, success, fail) {
  api.post("comment/update", { commentId: commentId, contents: contents, idTag: idTag }).then(success).catch(fail);
}

function writeComment(contents, idTag, reviewId, success, fail) {
  api.post("comment/write", { contents: contents, idTag: idTag, reviewId: reviewId }).then(success).catch(fail);
}

export { deleteComment, getUserCommentList, getReviewCommentList, editComment, writeComment };
