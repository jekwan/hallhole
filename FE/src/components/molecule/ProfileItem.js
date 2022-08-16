import React, { useEffect, useState } from "react";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import { Box, CardHeader } from "@mui/material";
import ButtonStyle from "../atom/Button";

import { checkFollowStatus, followUser, unfollowUser } from "../../apis/follow";

// props로 이미지 url과 username을 넘기면 됩니다
// 클릭 이벤트는 추후에 달면 됩니다!

export default function ProfileItem({ user, profileId, name }) {
  const [followStatus, setFollowStatus] = useState(true);

  useEffect(() => {
    if (user !== profileId) {
      checkFollowStatus(profileId, user, checkFollowStatusSuccess, checkFollowStatusFail);
    }
  }, [user, profileId, followStatus]);

  function checkFollowStatusSuccess(res) {
    setFollowStatus(res.data);
  }

  function checkFollowStatusFail(err) {}
  //팔로우
  function followSuccess(res) {
    setFollowStatus(true);
  }

  function followFail(err) {}

  function follow(e) {
    e.preventDefault();
    followUser(profileId, user, followSuccess, followFail);
  }

  // 언팔로우
  function unfollowSuccess(res) {
    setFollowStatus(false);
  }

  function unfollowFail(err) {}

  function unfollow(e) {
    e.preventDefault();
    unfollowUser(profileId, user, unfollowSuccess, unfollowFail);
  }

  return (
    <Box sx={{ width: 0.95, display: "flex", justifyContent: "space-between", alignItems: "center", marginY: 1, marginX: "auto"}}>
      <CardHeader
        sx={{ padding: 0.5 }}
        avatar={<ProfileImage type="small" src="" />}
        title={
          <TextStyle size="medium" variant="black">
            {name}
          </TextStyle>
        }
      ></CardHeader>
      {followStatus ? (
        <ButtonStyle size="none" variant="grey" onClick={unfollow}>
          <span style={{ width: "unset"}}>언팔로우</span>
        </ButtonStyle>
      ) : (
        <ButtonStyle size="none" variant="primary" onClick={follow}>
          팔로우
        </ButtonStyle>
      )}
    </Box>
  );
}
