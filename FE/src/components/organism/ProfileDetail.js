import React, { useEffect, useState } from "react";
import { CardHeader } from "@mui/material";
import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import { useSelector } from "react-redux";

import { checkFollowStatus, followUser, unfollowUser } from "../../apis/follow";
import { requestUserInfo } from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileDetail({ id }) {
  const [followStatus, setFollowStatus] = useState("");
  const user = useSelector(state => state.user.info);
  const [profileUser, setProfileUser] = useState([]);

  const movePage = useNavigate();

  useEffect(() => {
    requestUserInfo(id, getProfileUserSuccess, getProfileUserFail);
  }, [followStatus]);

  function getProfileUserSuccess(res) {
    setProfileUser(res.data);
    // console.log("프로필 유저 정보 조회 성공", res);
  }

  function getProfileUserFail(err) {
    // console.log("프로필 유저 정보 조회 실패", err);
  }

  // 유저 정보 불러왔는지 확인
  function validateProfileUser(profileUser) {
    return profileUser !== [];
  }

  //팔로우 여부 확인
  useEffect(() => {
    if (user?.idTag !== id) {
      checkFollowStatus(user?.idTag, id, checkFollowStatusSuccess, checkFollowStatusFail);
    }
  }, [user, id, followStatus]);

  function checkFollowStatusSuccess(res) {
    setFollowStatus(res.data);
  }

  function checkFollowStatusFail(err) {
    // console.log("팔로우 상태 확인 실패", err);
  }

  //팔로우
  function followSuccess(res) {
    // console.log("팔로우 성공");
    setFollowStatus(true);
  }

  function followFail(err) {
    // console.log("팔로우 실패");
  }

  function follow(e) {
    e.preventDefault();
    followUser(user.idTag, id, followSuccess, followFail);
  }

  // 언팔로우
  function unfollowSuccess(res) {
    // console.log("언팔로우 성공");
    setFollowStatus(false);
  }

  function unfollowFail(err) {
    // console.log("언팔로우 실패");
  }

  function unfollow(e) {
    e.preventDefault();
    unfollowUser(user.idTag, id, unfollowSuccess, unfollowFail);
  }

  // 프로필 수정 페이지 이동
  function editProfile(e) {
    e.preventDefault();
    movePage(`/editprofile`)
  }

  // 프로필 수정, 팔로우, 언팔로우 버튼 설정
  let ProfileButton;
  if (user?.idTag === id) {
    ProfileButton = (
      <ButtonStyle size="full" variant="negative" onClick={editProfile}>
        프로필 수정
      </ButtonStyle>
    );
  } else if (followStatus) {
    ProfileButton = (
      <ButtonStyle size="full" variant="grey" onClick={unfollow}>
        언팔로우
      </ButtonStyle>
    );
  } else {
    ProfileButton = (
      <ButtonStyle size="full" variant="primary" onClick={follow}>
        팔로우
      </ButtonStyle>
    );
  }

  return (
    <Box>
      {validateProfileUser ? (
        <Box>
          <CardHeader
            sx={{ padding: 0.5, width: "90vw", mx: "auto", my: 2 }}
            avatar={<ProfileImage type="large" src=""></ProfileImage>}
            title={ProfileButton}
          ></CardHeader>
          <Box sx={{ ml: 2 }}>
            <TextStyle size="large">{profileUser.name} </TextStyle>
            <TextStyle size="medium">{profileUser.idTag}</TextStyle>
            <br></br>
            <Link to={`/followlist/${id}`} style={{ textDecoration: "none" }}>
              <TextStyle size="medium">
                팔로워 : {profileUser.followerCnt} | 팔로잉 : {profileUser.followingCnt}
              </TextStyle>
            </Link>
            <br></br>
            <TextStyle size="small">{profileUser.profile}</TextStyle>
          </Box>
        </Box>
      ) : (
        <Box>로딩중</Box>
      )}
    </Box>
  );
}
