import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";

export default function CharacterProfile() {
  const user = useSelector(state => state.user.info);

  const movePage = useNavigate();

  function editHoly() {
    movePage(`/editholy`);
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ProfileImage type="large" char={user?.nowChar} acc={user?.nowAcc} />
        <Box sx={{ position: "absolute", ml: 13, mt: 15 }}>
          <CircleIcon sx={{ fontSize: 60, color: "#e37373" }} />
        </Box>
        <Box sx={{ position: "absolute", ml: 13, mt: 15 }}>
          <CheckroomIcon sx={{ fontSize: 30, color: "white" }} onClick={editHoly} />
        </Box>
      </Box>
    </Box>
  );
}
