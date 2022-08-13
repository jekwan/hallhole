import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

import Logo from "../atom/Logo";
import ProfileImage from "../atom/ProfileImage";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "@mui/material/Modal";
import storage from "../../helper/storage";
import Button from "../atom/Button";
import CloseIcon from "@mui/icons-material/Close";
import Text from "../atom/Text";

const NavModal = styled(Modal)``;

// width 수정 필요. 상위 요소 정해
const NavBox = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  width: 100vw;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  height: "100vh",
  bgcolor: "primary.week",
  p: 4,
  textAlign: "center",
};

export default function NavBar() {
  const user = useSelector(state => state.user.info);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function logout() {
    storage.remove("token");
  }

  return (
    <NavBox sx={{ zIndex: 1000 }}>
      {/* 홈 화면으로 돌아가는 링크 추가 */}
      <Link to="/main">
        <Logo sx={{ padding: 2 }} src="/logo.png" size="medium" />
      </Link>
      {/* 메뉴서랍? 오픈하기! */}
      {/* <Link to={`profile/${user?.idTag}`}>
        <ProfileImage type="thumb" src="" />
      </Link> */}
      <Box sx={{ marginX: 2 }}>
        <ProfileImage type="thumb" src="" onClick={handleOpen} />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ textAlign: "end" }}>
            <Button size="smallest" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <br />
          <br />
          <Text>필요 버튼</Text>
          <br />
          <Link to={`/profile/${user?.idTag}`} style={{ textDecoration: "none" }}>
            <Button size="medium" onClick={handleClose}>
              프로필 가기
            </Button>
          </Link>
          <Link to="/performancechatlist" style={{ textDecoration: "none" }}>
            <Button size="medium" onClick={handleClose}>
              채팅방 공연 리스트 페이지
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="medium" onClick={logout}>
              로그아웃
            </Button>
          </Link>
          <br />
          <Text>회색은 임시 버튼</Text>
          <br />
          <Link to="/followlist" style={{ textDecoration: "none" }}>
            <Button variant="grey" size="medium" onClick={handleClose}>
              팔로워리스트 확인
            </Button>
          </Link>
          <Link to="/forgot" style={{ textDecoration: "none" }}>
            <Button variant="grey" size="medium" onClick={handleClose}>
              비번 찾기 위한 이메일 페이지
            </Button>
          </Link>
          <Link to="/transmit" style={{ textDecoration: "none" }}>
            <Button variant="grey" size="medium" onClick={handleClose}>
              이메일 전송 확인 페이지
            </Button>
          </Link>
          <Link to="/editprofile" style={{ textDecoration: "none" }}>
            <Button variant="grey" size="medium" onClick={handleClose}>
              개인정보 수정 페이지
            </Button>
          </Link>
          <Link to="/editholy" style={{ textDecoration: "none" }}>
            <Button variant="grey" size="medium" onClick={handleClose}>
              캐릭터 꾸미기 페이지
            </Button>
          </Link>
        </Box>
      </Modal>
    </NavBox>
  );
}
