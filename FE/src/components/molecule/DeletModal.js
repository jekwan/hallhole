import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Box } from "@mui/system";
import { Dialog, DialogActions, DialogTitle, Slide, Button } from "@mui/material";
import ButtonStyle from "../atom/Button";

import { deleteProfile } from "../../apis/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({ title, alertTitle }) {
  const user = useSelector(state => state.user.info);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const movePage = useNavigate();

  function deleteDeleteSuccess(res) {
    alert("언제나 홀홀은 열려있습니다 ☺")
    // 로그인 전의 메인 페이지로 이동해야하는데, 이동하지 않음
    movePage(`/`)
    location.reload();
  }

  function deleteDeleteFail(err) {
  }

  function deleteThisProfile(e) {
    e.preventDefault();
    deleteProfile(deleteDeleteSuccess, deleteDeleteFail);
  }

  return (
    <Box>
      <Button sx={{ mt:2 }} color="error" size="medium" variant="text" onClick={handleClickOpen}>탈퇴하기</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>　　　　홀!!😥
          <br/>
          떠나신다니 너무 아쉬워요!
          <br/>
          정말로 탈퇴하시겠습니까?</DialogTitle>
        <DialogActions sx={{ margin: "auto", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <ButtonStyle size="smaller" variant="primary" onClick={handleClose}>
            취소
          </ButtonStyle>
          <ButtonStyle size="smaller" variant="grey" onClick={deleteThisProfile}>
            탈퇴
          </ButtonStyle>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
