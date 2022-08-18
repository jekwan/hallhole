import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../atom/Input";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import { editReview } from "../../apis/review";
import { getReviewInfo } from "../../apis/review";

export default function EditForm({ id }) {
  console.log(1, id);
  const user = useSelector(state => state.user.info);
  const [title, setTitle] = useState("");
  const [performanceId, setPerformanceId] = useState("");
  const [contents, setContents] = useState("");
  const [performanceTime, setPerformanceTime] = useState(new Date());
  const [star, setStar] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    console.log(2, id);
    getReviewInfo(id, getReviewInfoSuccess, getReviewInfoFail);
  }, [id]);

  function getReviewInfoSuccess(res) {
    console.log("성공성공");
    console.log(res.data);
    setTitle(res.data.title);
    setContents(res.data.contents);
    setStar(res.data.starEval);
    setPerformanceTime(res.data.performanceTime);
    setPerformanceId(res.data.performanceId);
  }

  function getReviewInfoFail(err) {
    console.log("실패");
    console.log(err);
  }

  function onChangeTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }

  function onChangeContents(e) {
    const contents = e.target.value;
    setContents(contents);
  }

  function updateReview(e) {
    e.preventDefault();
    editReview(
      id,
      contents,
      performanceId,
      performanceTime,
      star,
      title,
      user?.idTag,
      editReviewSuccess,
      editReviewFail,
    );
  }

  function editReviewSuccess(res) {
    navigate(`/reviewdetail/${res.data}`);
  }

  function editReviewFail(err) {}

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
      <Box sx={{ my: 2 }}>
        <TextStyle>&nbsp;별점</TextStyle>
        <br></br>
        <Rating
          name="half-rating"
          value={star}
          size="large"
          precision={0.5}
          onChange={(event, newStar) => {
            setStar(newStar);
          }}
        />
      </Box>

      <Box sx={{ my: 2 }}></Box>

      <Input value={title} size="large" variant="outlined" label="제목" onChange={onChangeTitle} />

      <TextField
        sx={{ width: "100%", mt: 2 }}
        value={contents}
        label="내용"
        variant="outlined"
        multiline
        rows={8}
        onChange={onChangeContents}
      />

      <Box sx={{ width: "50%", mt: 1, marginX: "auto", display: "flex", justifyContent: "space-between" }}>
        <ButtonStyle
          variant="grey"
          size="smaller"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </ButtonStyle>
        <ButtonStyle variant="primary" size="smaller" onClick={updateReview}>
          수정
        </ButtonStyle>
      </Box>
    </Box>
  );
}
