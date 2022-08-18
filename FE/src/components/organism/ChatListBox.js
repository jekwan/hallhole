import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import RoomItem from "../molecule/RoomItem";
import ChatRoom from "../page/ChatRoom";
import usePagination from "../molecule/SetPaginationData";
import { fetchChatList } from "../../apis/chat";
import Input from "../atom/Input";
import { Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";

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
  const [searchTerm, setSearchTerm] = React.useState("");
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(rooms.length / PER_PAGE);
  const _DATA = usePagination(rooms, PER_PAGE);

  function getFilteredRoomList() {
    return rooms
      .filter(val => {
        if (searchTerm == "") {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map(({ performance, name, openTime, closeTime, memberCnt }) => {
        return (
          <RoomItem
            key={performance.id}
            id={performance.id}
            name={name}
            openTime={openTime}
            closeTime={closeTime}
            memberCnt={memberCnt}
            poster={performance.poster}
          />)
      })
  }

  function getUnFilteredRoomList() {
    return _DATA.currentData().map(({ performance, name, openTime, closeTime, memberCnt }) => {
      return (
        <RoomItem
          key={performance.id}
          id={performance.id}
          name={name}
          openTime={openTime}
          closeTime={closeTime}
          memberCnt={memberCnt}
          poster={performance.poster}
        />)

    })
  }

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
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
            label="찾으시는 공연이 있으신가요?"
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
        <TextStyle variant="primary" size="small">진행중인 공연</TextStyle>
        <CategoryDivider type="primary" />
      </Box>

      <Box>
        <Box>
          {searchTerm.length > 0 ?
            getFilteredRoomList()
            : <Box>{getUnFilteredRoomList()}
              <Box sx={{ width: "100%", margin: "auto", my: 2 }}>
                <Pagination sx={{ display: "flex", justifyContent: "center" }} size="small" color="primary" shape="rounded" page={page} count={count} onChange={handleChange} />
              </Box></Box>
          }
        </Box>
      </Box>
    </div>
  );
}