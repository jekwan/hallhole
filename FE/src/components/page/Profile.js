import React, { useEffect, useState } from "react";
import LikePerformances from "../organism/LikePerformance";
import ProfileDetail from "../organism/ProfileDetail";
import UserActivity from "../organism/UserActivity";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/system";
import MyActivity from "../organism/MyActivity";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const { id } = useParams();
  const user = useSelector(state => state.user.info);

  useEffect(() => {
    checkUser();
  }, [user]);

  function checkUser() {
    return user?.idTag !== id;
  }
  const movePage = useNavigate();
  function backHistory() {
    movePage(`/main`);
  }

  return (
    <Box>
      <Box sx={{ml: 2, mt: 2}}>
        <KeyboardBackspaceIcon sx={{ml: 0.2, fontSize:30}} onClick={backHistory} />
      </Box>
      <Box>
        <ProfileDetail id={id} />
        <LikePerformances id={id} />
        {checkUser() ? <UserActivity id={id}></UserActivity> : <MyActivity></MyActivity>}
      </Box>
    </Box>
  );
}
