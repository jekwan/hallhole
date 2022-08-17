import React from "react";

import storage from "../../helper/storage";

import Button from "../atom/Button";
import Box from "@mui/material/Box";
import Partition from "../atom/CharacterPart"

export default function NoMatch() {
  function logout() {
    storage.remove("token");
  }

  function backPage() {
    window.history.back();
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ marginY: 5 }}>
        <Partition sx={{ mt:3, width:"80%" }} src="/404notfound.png"/>
      </Box>
      <Button variant="grey" onClick={backPage}>돌아가기</Button>
    </Box>
  );
}
