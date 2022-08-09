import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";

const RoomItemBox = styled(Box)`
  margin: 2%;
  background-color: white;
  border-radius: 3px;
`;

export default function RoomItem({ id, name }) {
  return (
    <RoomItemBox key={id}>
      <Box sx={{ boxShadow: 5, width: "90vw", height: "10vh", textAlign: "center", marginX: "auto", marginY: 3 }}>
        <Box>
          <Text size="small" variant="black">
            {name}
          </Text>
        </Box>
        <Box>
          <Text variant="black">test</Text>
        </Box>
      </Box>
    </RoomItemBox>
  );
}
