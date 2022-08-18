import { CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import { requestUserInfo } from "../../apis/user";

export default function ReviewItem(props) {
  const [char, setChar] = React.useState(0);
  const [acc, setAcc] = React.useState(0);

  function requestUserInfoSuccess(res) {
    setChar(res.data.nowChar);
    setAcc(res.data.nowAcc);
  }

  function requestUserInfoFail(res) {}

  useEffect(() => {
    requestUserInfo(props.writerTag, requestUserInfoSuccess, requestUserInfoFail);
  }, [props]);

  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  return (
    <CardHeader
      sx={{ padding: 0.5, mt: 1 }}
      avatar={
        <Link to={`/profile/${props.writerTag}`} style={{ textDecoration: "none" }}>
          <ProfileImage type="small" char={char} acc={acc} />
        </Link>
      }
      title={
        <Box>
          <Link to={`/reviewdetail/${props.id}`} style={{ textDecoration: "none" }}>
            <TextStyle size="medium" variant="black">
              {props.title}
            </TextStyle>
          </Link>
          <br></br>
          <TextStyle size="small" variant="grey">
            {props.user} | {props.star_eval} | {changeStrToDate(props.written_date)}
          </TextStyle>
        </Box>
      }
      onClick={props.onClick}
    ></CardHeader>
  );
}
