import React, { useEffect, useState } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { setChatToggle } from "../../stores/chat";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { getWebsocket } from "../../helper/websocket";
import { CHAT_TYPE } from "../../helper/constants";
import { fetchChatLog, fetchChatRoom } from "../../apis/chat";

import Modal from "../organism/Modal";
import PerformanceMiniPoster from "../molecule/PerformanceMiniPoster";
import ChatBox from "../organism/ChatBox";
import Button from "../atom/Button";

const ChatModal = styled(Modal)``;

const ChatModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ChatModalBody = styled(Box)`
  margin-top: 2vh;
`;

export default function ChatRoom(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.info);
  const chatId = useSelector(state => state.chat.id);
  const toggle = useSelector(state => state.chat.toggle);

  const ws = getWebsocket();

  const [chatRoom, setChatRoom] = useState({});
  const [messages, setMessages] = useState([]);

  function fetchChatLogSuccess(response) {
    setMessages(response.data);
  }

  function fetchChatLogFail(response) {}
  function fetchChatRoomSuccess(response) {
    setChatRoom(response.data);
  }

  function fetchChatRoomFail(response) {}

  function receiveMessage(response) {
    const recv = JSON.parse(response.body);
    setMessages(messages => [recv, ...messages]);
  }

  function connectSuccess(frame) {
    ws.subscribe(`/topic/chat/room/${chatId}`, receiveMessage);
    sendMessage(CHAT_TYPE.ENTER, "");
    fetchChatRoom(chatId, fetchChatRoomSuccess, fetchChatRoomFail);
    fetchChatLog(chatId, fetchChatLogSuccess, fetchChatLogFail);
  }

  function connectFail(error) {}

  function sendMessage(type, message = "") {
    const msg = {
      type: type,
      performanceId: chatId,
      memberNickName: user?.name,
      message: message,
      idTag: user?.idTag,
    };
    ws.send("/app/chat/message", {}, JSON.stringify(msg));
  }

  function connect() {
    if (!ws.active) {
      ws.connect({}, connectSuccess, connectFail);
    }
  }

  function disconnect() {
    if (ws.active) {
      ws.disconnect();
    }
  }

  function chatOn() {
    connect();
  }

  function chatOff() {
    disconnect();
  }

  function onClickBack() {
    dispatch(setChatToggle("off"));
  }

  function onClickLeft() {
    sendMessage(CHAT_TYPE.OUT);
    dispatch(setChatToggle("off"));
  }

  useEffect(() => {
    return () => {
      dispatch(setChatToggle("off"));
    };
  }, []);

  return (
    <ChatModal
      toggle={toggle}
      openHeight="11vh"
      closeHeight="100vh"
      modalOn={chatOn}
      modalOff={chatOff}
      backgroundcolor="white"
      borderRadius="15px"
    >
      <ChatModalHeader>
        <Button size="smallest" onClick={onClickBack}>
          <KeyboardBackspaceIcon />
        </Button>
        <Button size="smallest" onClick={onClickLeft}>
          <ExitToAppIcon />
        </Button>
      </ChatModalHeader>
      <PerformanceMiniPoster img={chatRoom?.performance?.poster} title={chatRoom?.name} date={chatRoom?.closeTime} />
      <ChatModalBody>
        <ChatBox messages={messages} sendMessage={sendMessage} />
      </ChatModalBody>
    </ChatModal>
  );
}
