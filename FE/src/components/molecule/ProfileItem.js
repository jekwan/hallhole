import React, { useEffect, useState } from "react";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import { Box, CardHeader } from "@mui/material";
import ButtonStyle from "../atom/Button";

// props로 이미지 url과 username을 넘기면 됩니다
// 클릭 이벤트는 추후에 달면 됩니다!

export default function ProfileItem(props) {
  const [follow, setFollow] = useState(true);

  // api 요청해 기본값 받는 로직 추가
  // useEffect(() => {
  //   setFollow()
  // })

  function onChangeFollowButton(e) {
    e.preventDefault();
    setFollow(!follow);
    console.log(follow);
    // post 요청
  }

  return (
    <Box sx={{ width: 0.95, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <CardHeader
        sx={{ padding: 0.5 }}
        avatar={<ProfileImage type="small" src="" />}
        title={
          <TextStyle size="medium" variant="black">
            {props.username}
          </TextStyle>
        }
        onClick={props.onClick}
      ></CardHeader>
      <ButtonStyle size="small" variant={follow ? "grey" : "primary"} onClick={onChangeFollowButton}>
        {follow ? "언팔로우" : "팔로우"}
      </ButtonStyle>
    </Box>
  );
}
