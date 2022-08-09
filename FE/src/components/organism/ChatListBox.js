import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/system";

import RoomItem from "../molecule/RoomItem";

import { fetchChatList } from "../../apis/chat";

export default function ChatBox() {
  const [room, setRoom] = React.useState([]);

  function fetchChatListSuccess(res) {
    setRoom(res.data);
    console.log("룸 요청 성공", res);
  }

  function fetchChatListFail(err) {
    console.log("룸 요청 실패", err);
  }

  useEffect(() => {
    fetchChatList(fetchChatListSuccess, fetchChatListFail);
  }, []);
  return <Box>{getRoomsList(room)}</Box>;
}

function getRoomsList(rooms) {
  console.log(rooms);
  return rooms
    .map(room => {
      return <RoomItem key={room.id} name={room.name} genre={room.genre} />;
    })
    .reverse();
}
