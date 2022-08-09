import React from "react";
import { CardHeader } from "@mui/material";
import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";

export default function ProfileDetail(props) {
  //   let ProfileButton = <ButtonStyle size="medium" variant="negative">테스트 중</ButtonStyle>
  //   if (request.user === props.user) {
  //     ProfileButton = <ButtonStyle size="medium" variant="negative">프로필 수정</ButtonStyle>
  //   } else if (request.user in props.user.follower) {
  //     ProfileButton = <ButtonStyle size="medium" variant="negative">언팔로우</ButtonStyle>
  //   } else {
  //     ProfileButton = <ButtonStyle size="medium" variant="primary">팔로우</ButtonStyle>
  //   }
  return (
    // props로 해당 user 정보를 받아와 나타낼 예정
    // button은 위 주석처리한 코드와 같이 조건에 따라 문구와 기능을 다르게 할 예정!
    <Box>
      <CardHeader
        sx={{ padding: 0.75 }}
        avatar={<ProfileImage type="large" src=""></ProfileImage>}
        title={
          <ButtonStyle size={"small"} variant={"primary"}>
            테스트 중
          </ButtonStyle>
        }
      ></CardHeader>
      <div style={{ marginLeft: 10 }}>
        <TextStyle size="large">{props.username} </TextStyle>
        <TextStyle size="medium">{props.usertag}</TextStyle>
        <br></br>
        <TextStyle size="medium">
          팔로워 : {props.follower} | 팔로잉 : {props.following}
        </TextStyle>
        <br></br>
        <TextStyle size="small">{props.profile}</TextStyle>
      </div>
    </Box>
  );
}
