import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";

export default function UserCharacterProfile({ nowAcc, nowChar }) {

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ProfileImage type="large" char={nowChar} acc={nowAcc} />
      </Box>
    </Box>
  );
}
