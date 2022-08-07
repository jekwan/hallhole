import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";

const TwitterItemBox = styled(Box)`
  margin: 2%;
  background-color: steelblue;
  border-radius: 3px;
`;

export default function TwitterItem({ id, content, url }) {
  return (
    <TwitterItemBox key={id}>
      <Box>
        <Text size="small" variant="white">
          {content}
        </Text>
      </Box>
      <Box>
        <Text>
          <a href={url} target="_blank">
            링크
          </a>
        </Text>
      </Box>
    </TwitterItemBox>
  );
}
