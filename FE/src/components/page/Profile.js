import React from "react";
import LikePerformances from "../molecule/LikePerformance";
import ProfileDetail from "../molecule/ProfileDetail";

export default function Profile () {
  const likePerformanceList = [
      { title: '웃는 남자', img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg", },
      { title: '웃는 남자', img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg", },
      { title: '웃는 남자', img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg", },
      { title: '웃는 남자', img: "https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg", },
  ]
  return(
    <div>
      <ProfileDetail username="경원" usertag="#34534" follower="7" following="7" profile="일단 테스트용입니다" />
      <LikePerformances likePerformances={likePerformanceList}/>
    </div>
  )
}