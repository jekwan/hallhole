import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";
import TwitterIcon from "@mui/icons-material/Twitter";

const TwitterItemBox = styled(Box)`
  margin: 2%;
  background-color: steelblue;
  border-radius: 3px;
`;

export default function TwitterItem({ id, content, url }) {
  return (
    <TwitterItemBox key={id}>
      <Box sx={{ width: "70%", float: "left" }}>
        <Text size="small" variant="white">
          {content}
        </Text>
      </Box>
      <Box sx={{ width: "30%", float: "left", marginTop: "2vh" }}>
        <a href={url} target="_blank" style={{ textDecoration: "none" }}>
          <Box>
            <TwitterIcon style={{ color: "white" }} fontSize="medium" />
          </Box>
          <Text>바로가기</Text>
        </a>
      </Box>
    </TwitterItemBox>
  );
}
