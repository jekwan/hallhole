import React from "react";

import { useDispatch } from "react-redux";
import { setToken } from "../../stores/user";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Text from "../atom/Text";
import Logo from "../atom/Logo";
import Input from "../atom/Input";
import Button from "../atom/Button";
import Modal from "../organism/Modal";
import ToggleButton from "../molecule/ToggleButton";
import { requestJoin, requestLogin } from "../../apis/user";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  function loginSuccess(res) {
    console.log(res);
    const token = res.data.token;
    dispatch(setToken(token));
    navigate("/main");
  }

  function loginFail(res) {}

  function joinSuccess(res) {}

  function joinFail(res) {}

  function onClickButton() {
    if (isLogin) requestLogin(email, password, loginSuccess, loginFail);
    else requestJoin(email, name, password, joinSuccess, joinFail);
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
          <Input size="sign" onKeyUp={e => setEmail(e.target.value)} />
          {!isLogin && <Input size="sign" onKeyUp={e => setName(e.target.value)} />}
          <Input size="sign" onKeyUp={e => setPassword(e.target.value)} />
          {!isLogin && <Input size="sign" onKeyUp={e => setConfirm(e.target.value)} />}
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
