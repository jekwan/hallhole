import React from "react";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import TwitterBox from "../organism/TwitterBox";
import LikePerformanceRank from "../organism/LikePerformanceRank";
import Button from "../atom/Button";
import SlickBox from "../organism/SlickBox";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJoinedChatRoom } from "../../apis/chat";

export default function Main() {
  const user = useSelector(state => state.user.info);
  const [joinedChatRooms, setJoinedChatRooms] = React.useState([]);

  function fetchJoinedChatRoomSuccess(response) {
    setJoinedChatRooms(response.data);
  }

  function fetchJoinedChatRoomFail(response) {
    setJoinedChatRooms([]);
  }

  React.useLayoutEffect(() => {
    fetchJoinedChatRoom(user?.idTag, fetchJoinedChatRoomSuccess, fetchJoinedChatRoomFail);
  }, [user]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box sx={userCheckBox}>
        <Box>
          <Box sx={userCheckText}>
            <Box sx={userCheck}>
              <Text variant="white" size="medium">
                <Text variant="primary" size="large">
                  {user?.name}님<br />
                </Text>
                {joinedChatRooms.length > 0 ? `이 채팅에 참여중이었어요!` : `아직 참여중인 채팅이 없어요!`}
              </Text>
            </Box>
          </Box>
          <Box sx={userCheckOpacity}></Box>
        </Box>
      </Box>
      <Box sx={backGroundPoster}></Box>
      <Box sx={posterPosition}>
        <SlickBox rooms={joinedChatRooms} />
      </Box>
      <Box sx={bottomPosition}>
        {joinedChatRooms.length > 0 && (
          <Box sx={buttonPosition}>
            <Link to="/performancechatlist" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="large" color="white">
                실시간 채팅방 더보기
              </Button>
            </Link>
          </Box>
        )}
        <Box sx={{ marginTop: 4, marginBottom: 5 }}>
          <LikePerformanceRank />
        </Box>

        <Box sx={TwitterBoxBackground}>
          <Box sx={{ marginBottom: 4, paddingTop: 3, textAlign: "left", marginLeft: 2 }}>
            <Text size="smallest">
              실시간 <br />
              <Text size="medium" weight="bold">
                티켓 정보
              </Text>
            </Text>
          </Box>
          <TwitterBox></TwitterBox>
          <Box sx={{ marginTop: 15, marginBottom: 5 }}>
            <Text size="smallest">(주)HALLHOLE</Text> <br />
            <Text size="smallest">서울 강남구 테헤란로 212 멀티캠퍼스 12층</Text> <br />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const userCheckBox = {
  position: "absolute",
  zIndex: 1,
  top: "120px",
};

const userCheckText = {
  position: "absolute",
  zIndex: 1,
  width: "100vw",
};

const userCheck = {
  marginTop: "15px",
  marginLeft: "10%",
};

const userCheckOpacity = {
  backgroundColor: "#000000",
  opacity: 0.6,
  width: "100vw",
  height: "100px",
};

const backGroundPoster = {
  width: "100vw",
  height: "480px",
  backgroundColor: "black",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPositionY: -200,
  // backgroundPositionX: -300,
  filter: "blur(4px)",
};

const posterPosition = {
  position: "relative",
  top: "-850px",
  textAlign: "center",
};

const bottomPosition = {
  position: "relative",
  top: "-770px",
  textAlign: "center",
};

const buttonPosition = {
  marginBottom: "50px",
  textAlign: "center",
};

const textQuestionDesign = {
  marginTop: 8,
  marginBottom: 5,
};

const inputPosition = {
  marginY: 2,
};

const likePeroformanceList = {
  marginY: 7,
};

const TwitterBoxBackground = {
  textAlign: "center",
  paddingBottom: 2,
  backgroundColor: "rgba(255, 0, 0, 0.2)",
};

// const userAlarm = {
//   position: "absolute",
//   zIndex: 1,
//   marginTop: 0.5,
//   marginLeft: 0.5,
// };
