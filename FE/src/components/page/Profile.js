import React, { useEffect, useState } from "react";
import LikePerformances from "../organism/LikePerformance";
import ProfileDetail from "../organism/ProfileDetail";
import UserActivity from "../organism/UserActivity";

import { Box } from "@mui/system";
import MyActivity from "../organism/MyActivity";

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

  return (
    <Box>
      <Box>
        <ProfileDetail id={id} />
        <LikePerformances id={id} />
        {checkUser() ? <UserActivity id={id}></UserActivity> : <MyActivity></MyActivity>}
      </Box>
    </Box>
  );
}
