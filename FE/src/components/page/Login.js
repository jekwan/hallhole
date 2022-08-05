import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Text from "../atom/Text";
import Logo from "../atom/Logo";
import Input from "../atom/Input";
import Button from "../atom/Button";
import Modal from "../organism/Modal";
import ToggleButton from "../molecule/ToggleButton";

const LoginModal = styled(Modal)``;

const closeIconStyle = {
  color: "white",
  fontSize: "3rem",
};

const LoginModalHeader = styled(Box)`
  padding: 5%;
`;

const LoginModalContent = styled(Box)`
  text-align: center;
`;

const LogoBox = styled(Box)`
  margin-top: 20%;
`;

const ToggleBox = styled(Box)`
  margin-top: 5%;
  text-align: center;
`;

export default function Login(props) {
  const [isLogin, setIsLogin] = React.useState(true);

  function onClickButton() {
    if (isLogin) {
      console.log("로그인 버튼 클릭");
    } else {
      console.log("회원가입 버튼 클릭");
    }
  }

  return (
    <LoginModal toggle={props.toggle}>
      <LoginModalHeader>
        <CloseIcon sx={closeIconStyle} onClick={props.onClose} />
      </LoginModalHeader>

      <LoginModalContent>
        <LogoBox>
          <Logo size="large" src="logo.png" />
        </LogoBox>
        <ToggleBox>
          <ToggleButton
            textLeft="로그인"
            textRight="회원가입"
            onClickLeft={() => setIsLogin(true)}
            onClickRight={() => setIsLogin(false)}
          />
        </ToggleBox>
        <Box>
          <Input size="sign" />
          {!isLogin && <Input size="sign" />}
          <Input size="sign" />
          {!isLogin && <Input size="sign" />}
          <Button size="large" variant="primary" onClick={onClickButton}>
            <Text size="medium" variant="white">
              {isLogin ? "로그인" : "회원가입"}
            </Text>
          </Button>
        </Box>
      </LoginModalContent>
    </LoginModal>
  );
}
