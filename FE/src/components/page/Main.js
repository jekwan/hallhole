import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import PosterSize from "../atom/PosterSize";
import Input from "../atom/Input";
import TwitterBox from "../organism/TwitterBox";
import LikePerformance from "../organism/LikePerformance";
import Button from "../atom/Button";
import SlickBox from "../organism/SlickBox";
// import ProfileImage from "../atom/ProfileImage";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Main() {
  const user = useSelector(state => state.user.info);

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
                  {user?.name}
                </Text>
                님<br />이 채팅에 참여중이었어요!
              </Text>
            </Box>
          </Box>
          <Box sx={userCheckOpacity}></Box>
        </Box>
      </Box>
      <Box sx={backGroundPoster}></Box>
      <Box sx={posterPosition}>
        <SlickBox />
      </Box>
      <Box>
        <Box sx={buttonPosition}>
          <Link to="/performancechatlist" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="large" color="white">
              실시간 채팅방 더보기
            </Button>
          </Link>
        </Box>
        {/* <Box sx={textQuestionDesign}>
          <Text variant="black" size="medium">
            찾고있는
            <Text variant="primary"> 뮤지컬 </Text>이 있나요?
          </Text>
        </Box>
        <Box sx={inputPosition}>
          <Box>
            <Input size="large" label="Search"></Input>
          </Box>
        </Box> */}
        {/* <Box sx={likePeroformanceList}>
          <LikePerformance id={user?.idTag} />
        </Box> */}
        {/* <Box>
          <Box sx={{ marginY: 10 }}>
            <Text variant="black" size="medium">
              내가 팔로우한 <br />
              <Text variant="primary">유저 네임</Text>
              님이 후기를 남겼어요.
            </Text>
          </Box>
          <Box>
            <Button variant="white" size="large" color="black">
              @username | 공연 꿀 잼 ..
            </Button>
          </Box>
          <Box>
            <Button variant="white" size="large" color="black">
              @username | 공연 또 보러 가자!
            </Button>
          </Box>
          <Box>
            <Button variant="white" size="large" color="black">
              @username | 공연 또 보러 가자!
            </Button>
          </Box>
        </Box> */}

        <Box sx={TwitterBoxBackground}>
          <TwitterBox></TwitterBox>
          <Box sx={{ marginTop: 20, marginBottom: 5 }}>
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
  marginLeft: "15%",
};

const userCheckOpacity = {
  backgroundColor: "#000000",
  opacity: 0.6,
  width: "100vw",
  height: "100px",
};

const backGroundPoster = {
  width: "100vw",
  height: "520px",
  backgroundImage: `url("https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg")`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPositionY: -200,
  // backgroundPositionX: -300,
  filter: "blur(4px)",
};

const posterPosition = {
  position: "relative",
  top: "-350px",
  textAlign: "center",
};

const buttonPosition = {
  position: "relative",
  top: "-260px",
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
  paddingTop: 10,
  paddingBottom: 2,
  backgroundColor: "rgba(255, 0, 0, 0.2)",
};

// const userAlarm = {
//   position: "absolute",
//   zIndex: 1,
//   marginTop: 0.5,
//   marginLeft: 0.5,
// };
