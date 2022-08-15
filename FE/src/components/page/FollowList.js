import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import TextStyle from "../atom/Text";
import ProfileItem from "../molecule/ProfileItem";
import CategorySelectButton from "../molecule/CategorySelectButton";
import { useSelector } from "react-redux";
import { requestUserInfo } from "../../apis/user";
import { requestfollowerList, requestfollowingList } from "../../apis/follow";
import { useParams } from "react-router-dom";

// 팔로워 팔로잉
const target = ["팔로워", "팔로잉"];

export default function FollowList() {
  const { id } = useParams();
  const [selectedTarget, setSelectedTarget] = useState(target[0]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const user = useSelector(state => state.user.info);
  const [profileUser, setProfileUser] = useState([]);
  
  useEffect(() => {
    requestUserInfo(id, getProfileUserSuccess, getProfileUserFail);
    requestfollowerList(id, 10, 0, getFollowerListSuccess, getFollowerListFail);
    requestfollowingList(id, 10, 0, getFollowingListSuccess, getFollowingListFail);
  }, [id]);

  function getProfileUserSuccess(res) {
    setProfileUser(res.data);
    console.log("프로필 유저 정보 조회 성공", res);
  }

  function getProfileUserFail(err) {
    console.log("프로필 유저 정보 조회 실패", err);
  }
  function getFollowerListSuccess(res) {
    setFollowerList(res.data);
    console.log("팔로워리스트 조회", res)
  }
  function getFollowerListFail(err) {
    console.log("팔로워 리스트 조회 실패", err);
  }

  function getFollowingListSuccess(res) {
    setFollowingList(res.data);
    console.log("팔로잉 리스트 조회", res);
  }
  function getFollowingListFail(err) {
    console.log("팔로잉 리스트 조회 실패", err);
  }
  // 유저 정보 불러왔는지 확인
  function validateProfileUser(profileUser) {
    return profileUser !== [];
  }

  function selectList(e) {
    e.preventDefault();
    setSelectedTarget(e.target.innerText);
  }

  return (
    <Box sx={{mt : 2}}>
      {validateProfileUser ? (
        <Box sx={{ width: "95%", margin: "auto"}}>
          <TextStyle size="large" variant="black">
            {profileUser.name}
          </TextStyle>

          <Box sx={{ display: "flex", margin:"auto", width: "97%" }}>
            {target.map((item, i) => (
              <CategorySelectButton
                key={i}
                category={item}
                selected={selectedTarget === item}
                onClick={selectList}
              ></CategorySelectButton>
            ))}
          </Box>

          <Box sx={{ marginTop: 1, margin:"auto"}}>
            {selectedTarget !== target[0]
              ? followerList.map((profile, i) => (
                  <ProfileItem key={i} user={user?.idTag} name={profile.name} profileId={profile.idTag}></ProfileItem>
                ))
              : followingList.map((profile, i) => (
                  <ProfileItem key={i} user={user?.idTag} name={profile.name} profileId={profile.idTag}></ProfileItem>
                ))}
          </Box>
        </Box>
      ) : (
        <Box>로딩중</Box>
      )}
    </Box>
  );
}
