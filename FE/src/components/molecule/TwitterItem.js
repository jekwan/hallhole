import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const TwitterItemBox = styled(Box)`
  margin: 2%;
  background-color: ${props => props.theme.palette.primary.week};
  border: solid;
  border-color: ${props => props.theme.palette.primary.week};
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
`;

const TimeArea = styled(Box)`
  width: 5rem;
  background-color: white;
  border-radius: 50px;
`;

export default function TwitterItem({ id, content, url, time, currentTime }) {
  function getFormattedTime(time) {
    const seconds = (currentTime - time) / 1000;
    if (seconds < 60) return `방금`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월`;
    const years = days / 365;
    return `${Math.floor(years)}년`;
  }

  return (
    <TwitterItemBox key={id}>
      <Box sx={{ width: "70%" }}>
        <TimeArea>
          <Text size="smaller" variant="grey">
            {getFormattedTime(new Date(time))} 전
          </Text>
        </TimeArea>
        <Box>
          <Text size="smaller" variant="black">
            {content}
          </Text>
        </Box>
      </Box>
      <Box sx={{ width: "30%" }}>
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
            <ConfirmationNumberIcon style={{ color: "white" }} fontSize="medium" />
          </Box>
          <Text size="small" weight="medium" variant="white">
            예매하기
          </Text>
        </a>
      </Box>
    </TwitterItemBox>
  );
}
