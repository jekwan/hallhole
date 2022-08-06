import React from "react";
import LikePerformances from "../organism/LikePerformance";
import ProfileDetail from "../organism/ProfileDetail";
import UserActivity from "../organism/UserActivity";

import { Box } from "@mui/system";
import MyActivity from "../organism/MyActivity";

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
  // {
  //   id: 8,
  //   title: "웃는 남자",
  //   img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg",
  // },
];

const reviews = [
  {
    id: 1,
    title: "진짜 최고야!!!!!!!!",
    date: "2022. 05.12",
    star_eval: 4.5,
    performance_name: "웃는 남자",
  },
  {
    id: 2,
    title: "진짜 최고야!!!!!!!!",
    date: "2022. 05.12",
    star_eval: 4.5,
    performance_name: "웃는 남자",
  },
  {
    id: 3,
    title: "진짜 최고야!!!!!!!!",
    date: "2022. 05.12",
    star_eval: 4.5,
    performance_name: "웃는 남자",
  },
];

export default function Profile() {
  return (
    <Box>
      <ProfileDetail username="경원" usertag="#34534" follower="7" following="7" profile="일단 테스트용입니다" />
      <LikePerformances likePerformances={likePerformanceList} />
      {/* <UserActivity username="경원" reviews={reviews}></UserActivity> */}
      <MyActivity reviews={reviews}></MyActivity>
    </Box>
  );
}
