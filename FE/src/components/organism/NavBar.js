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
import MenuIcon from "@mui/icons-material/Menu";

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
  width: "50vw",
  height: "30vh",
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
      <MenuIcon sx={{ fontSize: 48, color: "white", padding: 2 }} onClick={handleOpen}></MenuIcon>

      <Link to="/main">
        <Logo sx={{ padding: 2 }} src="/logo.png" size="medium" />
      </Link>
      {/* 메뉴서랍? 오픈하기! */}
      {/* <Link to={`profile/${user?.idTag}`}>
        <ProfileImage type="thumb" src="" />
      </Link> */}
      <Link to={`/profile/${user?.idTag}`} style={{ textDecoration: "none" }}>
        <Box sx={{ marginX: 2 }}>
          <ProfileImage type="thumb" />
        </Box>
      </Link>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ textAlign: "end" }}>
            <Button size="smallest" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Link to={`/profile/${user?.idTag}`} style={{ textDecoration: "none" }}>
            <Button size="small" onClick={handleClose}>
              Profile
            </Button>
          </Link>
          <Link to="/performancechatlist" style={{ textDecoration: "none" }}>
            <Button size="small" onClick={handleClose}>
              PerformanceList
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="small" onClick={logout}>
              Logout
            </Button>
          </Link>
        </Box>
      </Modal>
    </NavBox>
  );
}
