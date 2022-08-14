import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import RoomItem from "../molecule/RoomItem";
import ChatRoom from "../page/ChatRoom";

import { fetchChatList } from "../../apis/chat";
import Input from "../atom/Input";
import SearchIcon from "@mui/icons-material/Search";
import CategoryDivider from "../atom/CategoryDivider";
import Dropdown from "../atom/Dropdown";

export default function ChatListBox() {
  const [rooms, setRooms] = React.useState([]);

  function fetchChatListSuccess(res) {
    setRooms(res.data);
    console.log("룸 요청 성공", res);
  }

  function fetchChatListFail(err) {
    console.log("룸 요청 실패", err);
  }

  useEffect(() => {
    fetchChatList(fetchChatListSuccess, fetchChatListFail);
  }, []);
  return (
    <Box>
      {getRoomsList(rooms)}
      <ChatRoom />
    </Box>
  );
}

const inputPosition = {
  marginY: 2,
  top: "-40vh",
  textAlign: "center",
};

function getRoomsList(rooms) {
  // console.log(rooms);
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <div>
      <Box sx={inputPosition}>
        <Box sx={{ float: "left", marginLeft: "4%", marginRight: 0, marginTop: "0.5vh" }}>
          <SearchIcon sx={{ fontSize: 45, color: "#e37373" }} />
        </Box>
        <Box>
          <Input
            type="texy"
            size="large"
            label="Search"
            placeholder="Search"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          ></Input>
        </Box>
      </Box>
      {/* <Box sx={{ marginLeft: "80vw", marginTop: "2vh" }}>
        <Dropdown />
      </Box> */}
      <Box sx={{ width: "90vw", marginX: "auto", marginTop: "4vh" }}>
        <CategoryDivider type="primary" />
      </Box>
      {rooms
        .filter(val => {
          if (searchTerm == "") {
            return val;
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        })
        .map(roomBox => {
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
        })}
    </div>
  );
}
