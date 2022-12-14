import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import storage from "../../helper/storage";
import Logo from "../atom/Logo";
import Text from "../atom/Text";
import Button from "../atom/Button";
import PosterMarquee from "../organism/PosterMarquee";
import Login from "./Login";

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
  const navigate = useNavigate();
  const token = storage.get("token");
  const [toggle, setToggle] = React.useState("off");

  useEffect(() => {
    if (token) navigate("/main");
  }, []);

  const onOpen = e => {
    setToggle("on");
  };

  const onClose = e => {
    setToggle("off");
  };

  return (
    <Box sx={contentStyle}>
      <Box sx={posterListStyle}>
        <PosterMarquee cols={3} />
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
          {/* <Link to="/signin"> */}
          <Button size="large" variant="primary" onClick={onOpen}>
            <Text size="medium" variant="white">
              시작하기
            </Text>
          </Button>
          {/* </Link> */}
        </Box>
      </Box>

      <Login toggle={toggle} onClose={onClose} />
    </Box>
  );
}
