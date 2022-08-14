import React from "react";

import { useDispatch } from "react-redux";

import { setChatId, setChatToggle } from "../../stores/chat";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Text from "../atom/Text";
import PosterSize from "../atom/PosterSize";
import Button from "../atom/Button";
import { Link } from "react-router-dom";
import storage from "../../helper/storage";
import { useSelector } from "react-redux";

const RoomItemBox = styled(Box)`
  margin: 2px;
  background-color: white;
  border-radius: 3px;
`;

export default function RoomItem({ id, name, openTime, closeTime, memberCnt, poster, len, lastTxt, onOpen, onClose }) {
  const dispatch = useDispatch();

  if (len == "" || len == null) {
    len = 7;
  }
  if (lastTxt == "" || lastTxt == null) {
    lastTxt = "...";
  }
  if (name.length > len) {
    name = name.substr(0, len) + lastTxt;
  }

  function onClickEnter() {
    dispatch(setChatId(id));
    dispatch(setChatToggle("on"));
  }

  const user = useSelector(state => state.user.info);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function logout() {
    storage.remove("token");
  }

  return (
    <RoomItemBox key={id}>
      <Box sx={{ boxShadow: 5, width: "90vw", height: "140px", textAlign: "center", marginX: "auto", marginY: 3 }}>
        {/* 공연 상세페이지로 이동하기 */}
        <Link to={`/performancedetail/${id}`} style={{ textDecoration: "none" }}>
          <Box sx={{ float: "left", marginX: "1px", marginY: "3px", width: "25vw" }}>
            <PosterSize src={poster} size="small"></PosterSize>
          </Box>
          <Box sx={{ float: "left", width: "40vw", marginTop: 2 }}>
            <Text size="small" variant="black">
              {name}
            </Text>
            <Box sx={{ marginTop: 6 }}>
              <Text variant="primary" size="smallest">
                Open period
              </Text>
              <br />
              <Text variant="black" size="smallest">
                {openTime.slice(0, -9)}
              </Text>
              <Text variant="black" size="smallest">
                ~
              </Text>
              <Text variant="black" size="smallest">
                {closeTime.slice(5, -9)}
              </Text>
            </Box>
          </Box>
        </Link>
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
            <Button size="smallest" onClick={onClickEnter}>
              ENTER
            </Button>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Text variant="black">
              {memberCnt} 명
              <br />
              <Text size="smallest" variant="primary">
                참여 중
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </RoomItemBox>
  );
}
