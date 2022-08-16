import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CircleIcon from '@mui/icons-material/Circle';
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
      <Box sx={{ position:"relative", display: "flex", justifyContent: 'center', alignItems:'center' }}>
        <ProfileImage type="large" src=""></ProfileImage>
        <Box sx={{ position:"absolute", ml: 13, mt: 15}} >
          <CircleIcon sx={{ fontSize: 60, color: "#e37373" }}/>
        </Box>
        <Box sx={{ position:"absolute", ml: 13, mt: 15 }} >
          <CheckroomIcon sx={{ fontSize: 30, color: "white"}} onClick={editHoly}/>
        </Box>
      {/* </Box>
      <Box sx={{ mt:1, display: "flex", justifyContent: 'center', alignItems:'center' }}> */}
        {/* <ButtonStyle size={"medium"} variant={"primary"} onClick={editHoly}>캐릭터 꾸미기</ButtonStyle> */}
      </Box>
    </Box>
  )
}
