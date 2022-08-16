import React, { useState, useEffect } from "react";

import { styled } from "@mui/system";

import { Avatar } from "@mui/material";

import { useSelector } from "react-redux";

import { requestUserInfo } from "../../apis/user";



const Image = styled(Avatar)(
  ({ type }) => `
  width: ${getSizeByType(type)};
  height: ${getSizeByType(type)};
  border-radius: ${getBorderRadiusByType(type)};
`,
);

function getBorderRadiusByType(type) {
  switch (type) {
    case "thumb":
      return "50% 50% 0% 0%";
    default:
      return "50%";
  }
}

function getSizeByType(type) {
  switch (type) {
    case "large":
      return "150px";
    case "thumb":
      return "45px";
    case "small":
      return "55px";
  }
}

export default function ProfileImage(props) {
  const user = useSelector(state => state.user.info)
  const [acc, nowAcc] = React.useState(0);
  const [char, nowChar] = React.useState(0);

  useEffect(() => {
    requestUserInfo(user?.idTag, getProfileUserSuccess, getProfileUserFail);
  }, [user]);
  
  function getProfileUserSuccess(res) {
    nowAcc(user?.nowAcc)
    nowChar(user?.nowChar)
    console.log(user)
  }
  
  
  function getProfileUserFail(err) {
  }
  
  
  const avatarHoly = '/' + char + '_' + acc + '.png'
  /**
   * props
   *  - type : "large" 또는 "small" 또는 "thumb"
   *  - src : 이미지 url
   *  - onClick : 클릭 시 이벤트
   */
  return <Image type={props.type} src={avatarHoly} onClick={props.onClick}></Image>;
}
