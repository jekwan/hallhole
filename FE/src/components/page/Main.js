import React from "react";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import TwitterBox from "../organism/TwitterBox";
import LikePerformanceRank from "../organism/LikePerformanceRank";
import Button from "../atom/Button";
import SlickBox from "../organism/SlickBox";
import CategoryDivider from "../atom/CategoryDivider";

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
                  {user?.name}님
                </Text>
                　반가워요👋
                <br />
                {joinedChatRooms.length > 0 ? `이 채팅에 참여중이셨어요` : `아직 참여중인 채팅이 없어요!`}
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
                공연/채팅방 리스트
              </Button>
            </Link>
          </Box>
        )}
        <Box sx={{ marginTop: 4, marginBottom: 5 }}>
          <LikePerformanceRank />
        </Box>

        <Box sx={TwitterBoxBackground}>
          <Box sx={{ mb:2, paddingTop: 3, textAlign: "left", mx:2}}>
              <Text size="large" variant="primary">
                🎫 실시간 티켓 정보
              </Text>
            <CategoryDivider type="primary"/>
          <Box>
          </Box>
          </Box>

          <TwitterBox />
        </Box>
        <Box sx={{ my: 2 }}>
          <Text size="smaller">(주)HALLHOLE</Text> <br />
          <Text size="smaller"> A401 - 김제관/강승리/백경원/이재웅/임상빈/임효정</Text> <br />
          <Text size="smaller">서울 강남구 테헤란로 212 멀티캠퍼스 12층</Text> <br />
          <br />
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
  marginTop: 0.5,
  position: "absolute",
  zIndex: 1,
  width: "100vw",
};

const userCheck = {
  marginTop: "15px",
  textAlign: "center",
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
};

// const userAlarm = {
//   position: "absolute",
//   zIndex: 1,
//   marginTop: 0.5,
//   marginLeft: 0.5,
// };
