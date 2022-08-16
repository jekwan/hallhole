import React, {useEffect} from "react";
import { useNavigate } from "react-router";

import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";
import ButtonStyle from "../atom/Button";

export default function CharacterProfile () {
  const movePage = useNavigate();

  function editHoly() {
    movePage(`/editholy`)
  }
  
  return (
    <Box sx={{mt:2}}>
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems:'center' }}>
        <ProfileImage type="large" src=""></ProfileImage>
      </Box>
      <Box sx={{ mt:1, display: "flex", justifyContent: 'center', alignItems:'center' }}>
        <ButtonStyle size={"large"} variant={"primary"} onClick={editHoly}>캐릭터 꾸미기</ButtonStyle>
      </Box>
    </Box>
  )
}
