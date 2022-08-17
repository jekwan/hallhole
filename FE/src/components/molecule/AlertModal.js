import * as React from "react";
import { useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ButtonStyle from "../atom/Button";

import { deleteReview } from "../../apis/review";

import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertModal({ title, alertTitle, reviewId }) {
  const user = useSelector(state => state.user.info);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  function deleteReviewSuccess(res) {
    navigate("/main");
  }

  function deleteReviewFail(err) {
    console.log(err);
  }

  function deleteThisReview(e) {
    e.preventDefault();
    deleteReview(reviewId, user?.idTag, deleteReviewSuccess, deleteReviewFail);
  }

  return (
    <div>
      <ButtonStyle size="smaller" variant="grey" onClick={handleClickOpen}>
        {title}
      </ButtonStyle>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogActions sx={{ margin: "auto", display: "flex", justifyContent: "space-between", width: "80%" }}>
          <ButtonStyle size="smaller" variant="grey" onClick={handleClose}>
            취소
          </ButtonStyle>
          <ButtonStyle size="smaller" variant="primary" onClick={deleteThisReview}>
            확인
          </ButtonStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
}
