import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import PosterSize from "../atom/PosterSize";
import Input from "../atom/Input";
import TwitterBox from "../organism/TwitterBox";
import LikePerformance from "../organism/LikePerformance";
import Button from "../atom/Button";
import ProfileImage from "../atom/ProfileImage";

import { useStore } from "react-redux";

export default function Main() {
  const store = useStore();
  const [user, setUser] = useState(null);
  store.subscribe(() => {
    setUser(store.getState().user.info);
    console.log(store.getState().user.info);
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "200vh",
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
        <Card sx={posterCard}>
          <CardActionArea>
            <PosterSize
              size="large"
              src="https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg"
            ></PosterSize>
          </CardActionArea>
        </Card>

        <Box sx={textQuestionDesign}>
          <Text variant="black" size="medium">
            찾고있는
            <Text variant="primary"> 뮤지컬 </Text>이 있나요?
          </Text>
        </Box>
        <Box sx={inputPosition}>
          <Box>
            <Input size="large" label="Search"></Input>
          </Box>
        </Box>
        <Box>
          <LikePerformance likePerformances={likePerformanceList} />
        </Box>
        <Box>
          <Box sx={{ marginY: 10 }}>
            <Text variant="black" size="medium">
              내가 팔로우한 <br />
              <Text variant="primary">유저 네임</Text>
              님이 후기를 남겼어요.
            </Text>
          </Box>
          <Box>
            {/* <Box sx={userAlarm}>
              <ProfileImage size="small"></ProfileImage>
            </Box> */}
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
        </Box>

        <Box sx={TwitterBoxBackground}>
          <TwitterBox></TwitterBox>
          <Box sx={{ marginTop: 20, marginBottom: 5 }}>
            <Text>@2022 footer position</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const likePerformanceList = [
  {
    id: 1,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 2,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 3,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 4,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 5,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 6,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
  {
    id: 7,
    title: "웃는 남자",
    img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  },
];

const userCheckBox = {
  position: "absolute",
  zIndex: 1,
  top: "60px",
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
  backgroundColor: "#e37373",
  opacity: 0.6,
  width: "100vw",
  height: "100px",
};

const backGroundPoster = {
  width: "100vw",
  height: "58vh",
  backgroundImage: `url("https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg")`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPositionY: -200,
  filter: "blur(16px)",
};

const posterPosition = {
  position: "relative",
  top: "-400px",
  textAlign: "center",
};

const posterCard = {
  maxWidth: 300,
  width: "100vw",
  marginX: "auto",
  maxHeight: 400,
  boxShadow: 6,
  marginTop: 5,
  borderRadius: 10,
};

const textQuestionDesign = {
  marginTop: 8,
  marginBottom: 5,
};

const inputPosition = {
  marginY: 2,
};

const TwitterBoxBackground = {
  marginTop: 7,
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
