import React from "react";
import { Box } from "@mui/system";
import ProfileImage from "../atom/ProfileImage";
import ButtonStyle from "../atom/Button";


export default function CharacterProfile (props) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems:'center' }}>
      <ProfileImage type="large" src=""></ProfileImage>
      </Box>
      <ButtonStyle size={"large"} variant={"primary"}>캐릭터 꾸미기</ButtonStyle>
    </Box>
  )
}