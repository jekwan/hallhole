import React from "react";
// import Card from "@mui/material/Card";
// import { CardActionArea } from "@mui/material";
import TextStyle from "../atom/Text";
import Box from "@mui/material/Box";
// import PosterSize from "../atom/PosterSize";
import CategoryDivider from "../atom/CategoryDivider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ChatListBox from "../organism/ChatListBox";

export default function Performance() {
  function backHistory() {
    window.history.back();
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "240vh",
      }}
    >
      <KeyboardBackspaceIcon sx={{ ml:2, mt:2, fontSize:30 }} onClick={backHistory} />
      <Box sx={allPosition}>
        <Box sx={textQuestionDesign}>
          <TextStyle variant="black" size="large">
          🎪 공연/채팅
          </TextStyle>
        </Box>
        <Box sx={{mx:2}}>
          <CategoryDivider type="dark"/>
        </Box>
        <Box sx={{textAlign:"left", ml: 2, mt: 0.5}}>
          <TextStyle variant="black" size="small" weight="lighter">공연 정보와 채팅을 목록에서 확인할 수 있습니다</TextStyle>
        </Box>
      </Box>
      <ChatListBox></ChatListBox>
    </Box>
  );
}

const allPosition = {
  top: "-40vh",
  textAlign: "center",
};

const textQuestionDesign = {
  marginTop: 3,
  marginBottom: 2,
  textAlign: "left",
  marginLeft: 2,
};
