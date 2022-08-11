import api from "./api";

function followUser(followerTag, followingTag, success, fail) {
  api.post("follow", { followerTag: followerTag, followingTag: followingTag }).then(success).catch(fail);
}

function unfollowUser(followerTag, followingTag, success, fail) {
  api
    .delete("follow", { data: { followerTag: followerTag, followingTag: followingTag } })
    .then(success)
    .catch(fail);
}

function checkFollowStatus(followerTag, followingTag, success, fail) {
  api.post("follow/chk-follow", { followerTag: followerTag, followingTag: followingTag }).then(success).catch(fail);
}

function requestfollowerList(idTag, success, fail) {
  api.post("follow/follower", { idTag: idTag }).then(success).catch(fail)
}

function requestfollowingList(idTag, success, fail) {
  api.post("follow/following", { idTag: idTag }).then(success).catch(fail)
}

export { followUser, unfollowUser, checkFollowStatus, requestfollowerList, requestfollowingList };
