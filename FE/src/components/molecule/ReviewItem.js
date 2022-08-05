import { CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";

export default function ReviewItem(props) {
  return (
    <CardHeader
      sx={{ padding: 0.5 }}
      avatar={<ProfileImage type="small" src="" />}
      title={<Box>
        <TextStyle size="medium" variant="black">
          {props.title}
        </TextStyle>
        <br></br>
        <TextStyle size="small" variant="grey">{props.user} | {props.star_eval} | {props.written_date}</TextStyle>
        </Box>
      }
      onClick={props.onClick}
    ></CardHeader>
  );
}
