import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { Link } from "react-router-dom";

import Logo from "../atom/Logo";
import Text from "../atom/Text";
import Button from "../atom/Button";
import PosterMarquee from "../organism/PosterMarquee";

const contentStyle = {
  width: "100vw",
  height: "100vh",

  backgroundColor: theme => theme.palette.base.black,
};

const posterListStyle = {
  position: "fixed",
  padding: "0 3% 0 3%",
  margin: "3%",
  top: 0,
  left: 0,
};

const screenCoverStyle = {
  position: "fixed",
  padding: 0,
  margin: 0,
  bottom: 0,
  left: 0,

  textAlign: "center",

  width: "100%",
  height: "60%",

  background: "rgb(0,0,0)",
  background: "linear-gradient(0deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",

  display: "flex",
  flexDirection: "column",
};

const logoBoxStyle = {
  marginTop: "auto",
  marginBottom: "3%",
};
const mainDescriptionBoxStyle = {
  marginTop: 0,
  marginBottom: "1%",
};
const subDescriptionBoxStyle = {
  marginTop: 0,
  marginBottom: "3%",
};
const startButtonBoxStyle = {
  marginTop: 0,
  marginBottom: "5%",
};

const IntroLogo = styled(Logo)`
  margin: auto;
`;

export default function Intro() {
  return (
    <Box sx={contentStyle}>
      <Box sx={posterListStyle}>
        <PosterMarquee items={itemData} cols={3} />
      </Box>

      <Box sx={screenCoverStyle}>
        <Box sx={logoBoxStyle}>
          <IntroLogo size="large" src="logo.png" />
        </Box>
        <Box sx={mainDescriptionBoxStyle}>
          <Text size="large" variant="white">
            홀홀, 공연 채팅을
            <br /> 실시간으로
          </Text>
        </Box>
        <Box sx={subDescriptionBoxStyle}>
          <Text size="small" variant="white">
            다양한 공간에서 실시간으로 자유롭게
            <br /> 채팅하며 공연을 즐겨보세요
          </Text>
        </Box>
        <Box sx={startButtonBoxStyle}>
          <Link to="/signin">
            <Button size="large" variant="primary">
              <Text size="medium" variant="white">
                시작하기
              </Text>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const itemData = [
  {
    img: "poster_1.gif",
    title: "AIDA",
  },
  {
    img: "poster_2.gif",
    title: "엘리자벳",
  },
  {
    img: "poster_3.gif",
    title: "신데렐라",
  },
  {
    img: "poster_4.gif",
    title: "사의찬미",
  },
  {
    img: "poster_5.gif",
    title: "VEVERAFTER",
  },
  {
    img: "poster_6.gif",
    title: "살아있는 자를 수선하기",
  },
  {
    img: "poster_7.gif",
    title: "The Helmet",
  },
  {
    img: "poster_8.gif",
    title: "햄릿",
  },
  {
    img: "poster_9.gif",
    title: "번지점프를 하다",
  },
  {
    img: "poster_10.gif",
    title: "킹키부츠",
  },
  {
    img: "poster_11.gif",
    title: "터칭 더 보이드",
  },
  {
    img: "poster_12.gif",
    title: "빈센트 리버",
  },
  {
    img: "poster_13.gif",
    title: "마틸다",
  },
  {
    img: "poster_14.gif",
    title: "오만과 편견",
  },
  {
    img: "poster_15.gif",
    title: "해적",
  },
];
