import React, { useEffect, useState } from "react";
import LikePerformances from "../organism/LikePerformance";
import ProfileDetail from "../organism/ProfileDetail";
import UserActivity from "../organism/UserActivity";

import { Box } from "@mui/system";
import MyActivity from "../organism/MyActivity";

import { useParams } from "react-router-dom";


export default function Profile() {
  const { id } = useParams();

  return (
    <Box>
      <Box>
        <ProfileDetail id={id}/>
        <LikePerformances id={id}/>
        {/* <UserActivity username="경원" reviews={reviews}></UserActivity> */}
        {/* <MyActivity reviews={reviews}></MyActivity> */}
      </Box>
    </Box>
  );
}
