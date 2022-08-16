import React from "react";
// import Card from "@mui/material/Card";
// import { CardActionArea } from "@mui/material";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
// import PosterSize from "../atom/PosterSize";

import ChatListBox from "../organism/ChatListBox";

export default function Performance() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "240vh",
      }}
    >
      <Box sx={allPosition}>
        <Box sx={textQuestionDesign}>
          <Text variant="black" size="large">
            오픈 공연방
          </Text>
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
