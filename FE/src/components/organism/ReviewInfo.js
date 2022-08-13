import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";

import { requestName } from "../../apis/user";
import { Link } from "react-router-dom";

export default function ReviewInfo({ data }) {
  const [writerName, setWriterName] = useState([]);

  useEffect(() => {
    requestName(data?.writerTag, getWriterNameSuccess, getWriterNameFail);
  }, [data]);

  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  function getWriterNameSuccess(res) {
    setWriterName(res.data);
    // console.log("닉네임 조회 성공", res.data);
  }

  function getWriterNameFail(err) {
    // console.log("닉네임 조회 실패", err);
  }

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
      <TextStyle variant="black" size="medium" weight="bold">
        {data.title}
      </TextStyle>
      <CategoryDivider type="dark" />
      <br />
      <TextStyle variant="black" size="small" weight="bold">
        작성자&nbsp;&nbsp;
      </TextStyle>
      <Link to={`/profile/${data?.writerTag}`} style={{ textDecoration: "none" }}>
        <TextStyle variant="black" size="small" weight="normal">
          {writerName}
        </TextStyle>
      </Link>
      <br />
      <br />
      <TextStyle variant="black" size="small" weight="bold">
        작성일&nbsp;&nbsp;
      </TextStyle>
      <TextStyle variant="black" size="small" weight="normal">
        {changeStrToDate(data.updateTime)}
      </TextStyle>
      <br />
      <br />
      <TextStyle variant="black" size="small" weight="bold">
        별점&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </TextStyle>
      <TextStyle variant="black" size="small" weight="normal">
        {data.starEval}
      </TextStyle>
      <br />
      <br />
      <TextStyle variant="black" size="small" weight="normal">
        {data.contents}
      </TextStyle>
      <br />
      <br />
    </Box>
  );
}
