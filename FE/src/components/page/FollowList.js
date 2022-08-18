import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
    requestfollowerList(id, 100, 0, getFollowerListSuccess, getFollowerListFail);
    requestfollowingList(id, 100, 0, getFollowingListSuccess, getFollowingListFail);
  }, [id]);

  function getProfileUserSuccess(res) {}

  function getProfileUserFail(err) {}

  function getFollowerListSuccess(res) {
    setFollowerList(res.data);
  }
  function getFollowerListFail(err) {}

  function getFollowingListSuccess(res) {
    setFollowingList(res.data);
  }
  function getFollowingListFail(err) {}

  function validateProfileUser(profileUser) {
    return profileUser !== [];
  }

  function selectList(e) {
    e.preventDefault();
    setSelectedTarget(e.target.innerText);
  }
  const movePage = useNavigate();

  function backProfile() {
    const userId = user.idTag;
    movePage(`/profile/${userId}`);
  }

  return (
    <Box sx={{ mt: 2 }}>
      {validateProfileUser ? (
        <Box sx={{ width: "95%", margin: "auto" }}>
          <KeyboardBackspaceIcon sx={{ ml: 1, fontSize: 30 }} onClick={backProfile} />
          <Box sx={{ display: "flex", margin: "auto", width: "97%" }}>
            {target.map((item, i) => (
              <CategorySelectButton
                key={i}
                category={item}
                selected={selectedTarget === item}
                onClick={selectList}
              ></CategorySelectButton>
            ))}
          </Box>

          <Box sx={{ marginTop: 1, margin: "auto" }}>
            {selectedTarget !== target[0]
              ? followingList.map((profile, i) => (
                  <ProfileItem
                    key={i}
                    user={user?.idTag}
                    name={profile.name}
                    profileId={profile.idTag}
                    char={profile?.nowChar}
                    acc={profile?.nowAcc}
                  ></ProfileItem>
                ))
              : followerList.map((profile, i) => (
                  <ProfileItem
                    key={i}
                    user={user?.idTag}
                    name={profile.name}
                    profileId={profile.idTag}
                    char={profile?.nowChar}
                    acc={profile?.nowAcc}
                  ></ProfileItem>
                ))}
          </Box>
        </Box>
      ) : (
        <Box>로딩중</Box>
      )}
    </Box>
  );
}
