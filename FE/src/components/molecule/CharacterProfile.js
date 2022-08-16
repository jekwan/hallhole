import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";

import { requestUserInfo } from "../../apis/user";


export default function CharacterProfile () {
  const user = useSelector(state => state.user.info)
  const [acc, nowAcc] = React.useState(0);
  const [char, nowChar] = React.useState(0);

  useEffect(() => {
    requestUserInfo(user?.idTag, getProfileUserSuccess, getProfileUserFail);
  }, [user]);
  
  function getProfileUserSuccess(res) {
    nowAcc(user?.nowAcc)
    nowChar(user?.nowChar)
    console.log(user)
  }
  
  
  function getProfileUserFail(err) {
  }
  
  
  const avatarHoly = '/' + char + '_' + acc + '.png'
  
  const movePage = useNavigate();

  function editHoly() {
    movePage(`/editholy`)
  }
  

  return (
    <Box sx={{mt:2}}>
      <Box sx={{ position:"relative", display: "flex", justifyContent: 'center', alignItems:'center' }}>
        <ProfileImage type="large" src={avatarHoly}></ProfileImage>
        <Box sx={{ position:"absolute", ml: 13, mt: 15}} >
          <CircleIcon sx={{ fontSize: 60, color: "#e37373" }}/>
        </Box>
        <Box sx={{ position:"absolute", ml: 13, mt: 15 }} >
          <CheckroomIcon sx={{ fontSize: 30, color: "white"}} onClick={editHoly}/>
        </Box>
      </Box>
    </Box>
  )
}
