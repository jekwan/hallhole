import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import storage from "../helper/storage";
import { requestMyInfo } from "../apis/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfoToStore } from "../stores/user";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = storage.get("token");

  useEffect(() => {
    if (token) {
      requestMyInfo(
        res => {
          dispatch(setUserInfoToStore(res.data));
        },
        err => {
          console.log("유저 정보를 가져오지 못했습니다", err);
          storage.remove("token");
          navigate("/");
        },
      );
    }
  });

  return <Outlet />;
}
