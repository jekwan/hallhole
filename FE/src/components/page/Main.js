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
// import ProfileImage from "../atom/ProfileImage";

import { useSelector } from "react-redux";

export default function Main() {
  const user = useSelector(state => state.user.info);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "240vh",
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
        <Box sx={likePeroformanceList}>
          <LikePerformance id={user?.idTag}/>
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
    title: "데스노트",
    img: "http://ticketimage.interpark.com/TCMS3.0/MProd/ProdBridge/2205/220525111552_22006226.gif",
  },
  {
    id: 3,
    title: "아이다",
    img: "http://ticketimage.interpark.com/Play/image/large/22/22001534_p.gif",
  },
  {
    id: 4,
    title: "킹키 부츠",
    img: "http://ticketimage.interpark.com/TicketImage/notice_poster/20/2022051909103327.jpg",
  },
  {
    id: 5,
    title: "사랑의 불시착",
    img: "http://ticketimage.interpark.com/Play/image/large/22/22009050_p.gif",
  },
  {
    id: 6,
    title: "엘리자벳",
    img: "http://ticketimage.interpark.com/TCMS3.0/MProd/ProdBridge/2207/220713041957_22008801.gif",
  },
  {
    id: 7,
    title: "v 에버 애프터",
    img: "http://tkfile.yes24.com/upload2/PerfBlog/202108/20210812/20210812-39879.jpg",
  },
];

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
  top: "-40vh",
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

const likePeroformanceList = {
  marginY: 7,
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
