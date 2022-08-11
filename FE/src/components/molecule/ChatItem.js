import React from "react";

import { Box, useTheme } from "@mui/material";
import { styled } from "@mui/system";

import ProfileImage from "../atom/ProfileImage";
import Text from "../atom/Text";

const Content = styled(Box)`
  margin-top: 10px;
  padding: 2vw;
  display: flex;
  justify-content: ${({ whoseMessage }) => (whoseMessage === "other" ? "flex-start" : "flex-end")};
`;

const ProfileImageBox = styled(Box)`
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatBody = styled(Box)`
  max-width: 60vw;
  dispaly: flex;
  flex-direction: column;
`;

const SenderInfoBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  max-width: 70vw;
`;

const MessageBox = styled(Box)`
  word-break: break-all;
  border: ${props => `1px solid ${props.bordercolor}`};
  border-radius: 5px;
  padding: 6px;
  box-shadow: ${props => `1px 1px 1px ${props.bordercolor}`};
  background-color: ${props => props.backgroundcolor};
  color: ${props => props.color};
`;

const NameBox = styled(Box)``;

const TimeBox = styled(Box)``;

export default function ChatItem({ whoseMessage = "other", name, message, time, currentTime }) {
  const theme = useTheme();

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

  function getBackgroundColor() {
    if (whoseMessage === "me") return theme.palette.primary.main;
    else return theme.palette.base.white;
  }

  function getFontColor() {
    if (whoseMessage === "me") return theme.palette.base.white;
    else return theme.palette.base.black;
  }

  function getBorderColor() {
    if (whoseMessage === "me") return theme.palette.primary.week;
    else return "#ccc";
  }

  return (
    <Content whoseMessage={whoseMessage}>
      <ProfileImageBox>{whoseMessage == "other" && <ProfileImage size="small" />}</ProfileImageBox>
      <ChatBody>
        {whoseMessage == "other" && (
          <SenderInfoBox>
            <NameBox>
              <Text>{name}</Text>
            </NameBox>
          </SenderInfoBox>
        )}
        <MessageBox
          whoseMessage={whoseMessage}
          backgroundcolor={getBackgroundColor()}
          color={getFontColor()}
          bordercolor={getBorderColor()}
        >
          {message}
        </MessageBox>
        <TimeBox>
          <Text size="smallest" variant="grey" weight="lighter">
            {getFormattedTime(new Date(time))} 전
          </Text>
        </TimeBox>
      </ChatBody>
    </Content>
  );
}
