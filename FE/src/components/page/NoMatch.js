import React from "react";

import { Link } from "react-router-dom";

import storage from "../../helper/storage";

import Button from "../atom/Button";
import Box from "@mui/material/Box";
import Text from "../atom/Text";

export default function NoMatch() {
  function logout() {
    storage.remove("token");
  }
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ marginY: 5 }}>
        <Text size="large">잘못 된 경로입니다.</Text>
      </Box>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="grey">돌아가기</Button>
        <Button onClick={logout}>로그 아웃</Button>
      </Link>
    </Box>
  );
}
