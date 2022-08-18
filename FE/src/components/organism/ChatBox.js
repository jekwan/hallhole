import React, { useRef, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularProgress from "@mui/material/CircularProgress";

import ChatItem from "../molecule/ChatItem";
import Input from "../atom/Input";
import Button from "../atom/Button";
import Text from "../atom/Text";

import { fetchChatLog } from "../../apis/chat";

import { CHAT_TYPE, ERROR, CHAT_LOAD_SIZE } from "../../helper/constants";

const Content = styled(Box)`
  width: 90vw;
  margin: auto;
`;

const ChatHistoryArea = styled(Box)`
  height: 40vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: scroll;
`;

const ChatInputArea = styled(Box)`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
`;

const ScrollToBottomArea = styled(Box)`
  position: sticky;
  bottom: 0;
  width: auto;
  height: 3rem;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollToBottomBox = styled(Box)`
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 50px;
  height: 2rem;

  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  background-color: ${props => props.theme.palette.primary.main};
  border-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.base.white};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomDetector = styled(Box)`
  height: 1rem;
`;

const TopDetector = styled(Box)`
  height: 1rem;
`;

export default function ChatBox({ messages, sendMessage, chatEnter, setMessages }) {
  const chatId = useSelector(state => state.chat.id);

  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const [bottomDetector, setBottomDetector] = useState(null);
  const [topDetector, setTopDetector] = useState(null);
  const [isScrollBottom, setIsScrollBottom] = useState(true);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onBottomIntersect([entry]) {
    if (!entry.isIntersecting) {
      setIsScrollBottom(false);
    } else {
      setIsScrollBottom(true);
    }
  }

  function onTopIntersect([entry]) {
    if (entry.isIntersecting) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
  }

  useEffect(() => {
    if (isScrollTop) {
      setIsLoading(true);
      fetchChatLog(
        chatId,
        page + 1,
        CHAT_LOAD_SIZE,
        response => {
          setMessages(messages => [...messages, ...response.data]);
          setPage(page => page + 1);
          setScrollHeight(contentRef.current.scrollHeight);
          setIsLoading(false);
        },
        response => {},
      );
    }
  }, [isScrollTop]);

  useEffect(() => {
    contentRef.current.scrollTop += contentRef.current.scrollHeight - scrollHeight;
  }, [messages]);

  useEffect(() => {
    let observer;
    if (bottomDetector) {
      observer = new IntersectionObserver(onBottomIntersect);
      observer.observe(bottomDetector);
    }

    return () => observer && observer.disconnect();
  }, [bottomDetector]);

  useEffect(() => {
    let observer;
    if (topDetector) {
      observer = new IntersectionObserver(onTopIntersect);
      observer.observe(topDetector);
    }

    return () => observer && observer.disconnect();
  }, [topDetector]);

  const user = useSelector(state => state.user.info);

  const contentRef = useRef();
  const inputRef = useRef();

  let updateTimeInterval = null;

  useEffect(() => {
    updateTimeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(updateTimeInterval);
    };
  }, []);

  function scrollToBottom() {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatEnter]);

  function getChatList(chats) {
    let id = 0;
    return chats
      .map(chat => {
        return (
          <ChatItem
            key={id++ + chat.messageTime}
            whoseMessage={chat.idTag == user.idTag ? "me" : "other"}
            name={chat.memberNickName}
            message={chat.message}
            time={chat.messageTime}
            currentTime={currentTime}
            type={chat.type}
            idTag={chat.idTag}
            char={chat.characterType}
            acc={chat.accessoryType}
          />
        );
      })
      .reverse();
  }

  function onInputChange(e) {
    setMessage(e.target.value);
  }

  function onClickSend() {
    if (message.length > 0) {
      sendMessage(CHAT_TYPE.TALK, message);
      setMessage("");
      setErrorMessage("");
    } else {
      setErrorMessage(ERROR.NO_MESSAGE);
    }
  }

  return (
    <Content>
      <ChatHistoryArea ref={contentRef}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <CircularProgress />
          </Box>
        )}
        <TopDetector ref={setTopDetector}></TopDetector>
        {getChatList(messages)}
        <BottomDetector ref={setBottomDetector}></BottomDetector>
        {!isScrollBottom && (
          <ScrollToBottomArea>
            <ScrollToBottomBox onClick={scrollToBottom}>
              <Text size="small" variant="white">
                아래로
              </Text>
              <ArrowDownwardIcon />
            </ScrollToBottomBox>
          </ScrollToBottomArea>
        )}
      </ChatHistoryArea>
      <ChatInputArea ref={inputRef}>
        <Input size="large" value={message} onChange={onInputChange} errorMessage={errorMessage}></Input>
        <Button size="smallest" onClick={onClickSend} radius="50">
          <SendIcon />
        </Button>
      </ChatInputArea>
      <Text size="smallest" variant="grey" weight="normal">
        함께 대화하는 모두를 위해 에티켓을 지켜주세요.
      </Text>
    </Content>
  );
}
