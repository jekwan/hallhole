import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";
import PosterSize from "../atom/PosterSize";
import Button from "../atom/Button";

const RoomItemBox = styled(Box)`
  margin: 2%;
  background-color: white;
  border-radius: 3px;
`;

export default function RoomItem({ id, name, openTime, closeTime, memberCnt, poster, len, lastTxt }) {
  if (len == "" || len == null) {
    len = 10;
  }
  if (lastTxt == "" || lastTxt == null) {
    lastTxt = "...";
  }
  if (name.length > len) {
    name = name.substr(0, len) + lastTxt;
  }

  return (
    <RoomItemBox key={id}>
      <Box sx={{ boxShadow: 5, width: "90vw", height: "15vh", textAlign: "center", marginX: "auto", marginY: 3 }}>
        <Box sx={{ float: "left", marginX: "1px", marginY: "1px", width: "25vw" }}>
          <PosterSize src={poster} size="small"></PosterSize>
        </Box>
        <Box sx={{ float: "left", width: "40vw", marginTop: 2 }}>
          <Text size="small" variant="black">
            {name}
          </Text>
          <Box sx={{ marginTop: 6 }}>
            <Text variant="primary" size="smaller">
              Open period
            </Text>
            <br />
            <Text variant="black" size="smaller">
              {openTime.slice(0, -9)}
            </Text>
            <Text variant="black" size="smaller">
              ~
            </Text>
            <Text variant="black" size="smaller">
              {closeTime.slice(5, -9)}
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            float: "left",
            position: "relative",
            width: "2px",
            height: 110,
            backgroundColor: "primary.main",
            marginTop: 2,
            marginLeft: 1,
          }}
        ></Box>
        <Box sx={{ float: "right", width: "20vw" }}>
          <Box sx={{ marginTop: 1 }}>
            <Button size="smaller">ENTER</Button>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Text variant="black">
              {memberCnt} 명
              <br />
              <Text size="smaller" variant="primary">
                참여 중
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </RoomItemBox>
  );
}
