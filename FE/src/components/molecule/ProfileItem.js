import React from "react";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import { CardHeader } from "@mui/material";

// props로 이미지 url과 username을 넘기면 됩니다
// 클릭 이벤트는 추후에 달면 됩니다!

export default function ProfileItem(props) {
  return (
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
  );
}
