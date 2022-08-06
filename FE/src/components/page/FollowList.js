import { Box } from "@mui/system";
import React, { useState } from "react";

import TextStyle from "../atom/Text";
import ProfileItem from "../molecule/ProfileItem";
import CategorySelectButton from "../molecule/CategorySelectButton";

// 팔로워 팔로잉
const target = ["팔로워", "팔로잉"];

const followList = [
  { username: "경원" },
  { username: "경원" },
  { username: "경원" },
  { username: "경원" },
  { username: "경원" },
];
const followerList = [
  { username: "효정" },
  { username: "승리" },
  { username: "재웅" },
  { username: "제관" },
  { username: "상빈" },
];

export default function FollowList(props) {
  const [selectedTarget, setSelectedTarget] = useState(target[0]);
  const [selectedTargetList, setSelectedTargetList] = useState(followerList);

  function selectFollowList(e) {
    e.preventDefault();
    // 선택한 버튼 active 처리
    setSelectedTarget(e.target.innerText);
    // 선택한 버튼에 따라 팔로워, 팔로잉 목록 변경(추후, user의 follow 목록 넣으면 됨!)
    if (e.target.innerText === target[0]) {
      setSelectedTargetList(followerList);
    } else {
      setSelectedTargetList(followList);
    }
  }

  return (
    <Box sx={{ width: "95%", marginLeft: 1 }}>
      <TextStyle size="large" variant="black">
        {props.username}
      </TextStyle>
      {/* CATEGORY SELECTOR */}
      <Box sx={{ display: "flex", marginY: 2 }}>
        {target.map((item, i) => (
          <CategorySelectButton
            key={i}
            category={item}
            selected={selectedTarget === item}
            onClick={selectFollowList}
          ></CategorySelectButton>
        ))}
      </Box>
      {/* profileitem map해서 보여주기 */}
      <Box sx={{ marginTop: 1 }}>
        {selectedTargetList.map((profile, i) => (
          <ProfileItem key={i} username={profile.username}></ProfileItem>
        ))}
      </Box>
    </Box>
  );
}
