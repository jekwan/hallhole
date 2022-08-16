import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";
import TwitterIcon from "@mui/icons-material/Twitter";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const TwitterItemBox = styled(Box)`
  margin: 2%;
  background-color: steelblue;
  border-radius: 3px;
`;

export default function TwitterItem({ id, content, url }) {
  return (
    <TwitterItemBox key={id}>
      <Box sx={{ width: "70%", float: "left" }}>
        <Text size="smaller" variant="black">
          {content}
        </Text>
      </Box>
      <Box sx={{ width: "30%", float: "left" }}>
        <a href={url} target="_blank" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              float: "left",
              position: "relative",
              width: "2px",
              height: 110,
              backgroundColor: "base.white",
              marginLeft: 2,
            }}
          ></Box>
          <Box sx={{ marginTop: 3 }}>
            <ConfirmationNumberIcon style={{ color: "E38F8F" }} fontSize="medium" />
          </Box>
          <Text size="small" weight="medium" variant="white">
            예매하기
          </Text>
        </a>
      </Box>
    </TwitterItemBox>
  );
}
