import React, { useEffect } from "react";

import Box from "@mui/material/Box";

import RoomItem from "../molecule/RoomItem";

import { fetchChatList } from "../../apis/chat";

export default function ChatListBox() {
  const [roomBox, setRoom] = React.useState([]);

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
  return <Box>{getRoomsList(roomBox)}</Box>;
}

function getRoomsList(rooms) {
  console.log(rooms);
  return rooms.map(roomBox => {
    return (
      <RoomItem
        key={roomBox.performance.id}
        id={roomBox.performance.id}
        name={roomBox.name}
        openTime={roomBox.openTime}
        closeTime={roomBox.closeTime}
        memberCnt={roomBox.memberCnt}
        poster={roomBox.performance.poster}
      />
    );
  });
}
