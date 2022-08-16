import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../atom/Input";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import { writeReview } from "../../apis/review";

export default function ReviewForm({ id }) {
  const user = useSelector(state => state.user.info);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [performanceTime, setPerformanceTime] = useState(new Date());
  const [star, setStar] = useState(0);
  const [moveTo, setMoveTo] = useState("");
  let navigate = useNavigate();

  function onChangeTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }

  function onChangeContents(e) {
    const contents = e.target.value;
    setContents(contents);
  }

  function postReview(e) {
    e.preventDefault();
    writeReview(contents, id, performanceTime, star, title, user?.idTag, writeReviewSuccess, writeReviewFail);
  }

  function writeReviewSuccess(res) {
    setMoveTo(res.data);
    // movePage(`/reviewdetail/${moveTo}`)
  }

  function writeReviewFail(err) {
    console.log(err);
  }

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
      {/* 별점 */}
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
      {/* 날짜 */}
      <Box sx={{ my: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={props => <TextField {...props} />}
            label="날짜"
            value={performanceTime}
            onChange={newValue => {
              setPerformanceTime(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
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
        <ButtonStyle variant="primary" size="smaller" onClick={postReview}>
          작성
        </ButtonStyle>
      </Box>
    </Box>
  );
}
