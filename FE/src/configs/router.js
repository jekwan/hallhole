import React from "react";

import store from "./store";

import { Routes, Route, Navigate } from "react-router-dom";

import Intro from "../components/page/Intro-pinterest";
import NoMatch from "../components/page/NoMatch";
import Profile from "../components/page/Profile";
import Main from "../components/page/Main";
import ForgotPassword from "../components/page/Forgot-password";
import ForgotPasswordTransmit from "../components/page/Forgot-password-transmit";
import FollowList from "../components/page/FollowList";
import EditCharacter from "../components/page/EditCharacter";
import EditProfile from "../components/page/EditProfile";
import PerformanceChatList from "../components/page/PerformanceChatList";

import storage from "../helper/storage";
import PerformanceDetail from "../components/page/PerformanceDetail";

function checkAuth() {
  return !!storage.get("token");
}

function CheckAuth({ children }) {
  if (checkAuth()) return children;
  return <Navigate to="/" />;
}

export default function RouterConfiguration() {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
      <Route path="/" element={<Intro />} />
      <Route
        path="/main"
        element={
          <CheckAuth>
            <Main />
          </CheckAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <CheckAuth>
            <Profile />
          </CheckAuth>
        }
      />
      <Route
        path="/followlist"
        element={
          <CheckAuth>
            <FollowList />
          </CheckAuth>
        }
      />
      <Route
        path="/forgot"
        element={
          <CheckAuth>
            <ForgotPassword />
          </CheckAuth>
        }
      />
      <Route
        path="/transmit"
        element={
          <CheckAuth>
            <ForgotPasswordTransmit />
          </CheckAuth>
        }
      />
      <Route
        path="/editprofile"
        element={
          <CheckAuth>
            <EditProfile />
          </CheckAuth>
        }
      />
      <Route
        path="/editholy"
        element={
          <CheckAuth>
            <EditCharacter />
          </CheckAuth>
        }
      />
      <Route
        path="/performancechatlist"
        element={
          <CheckAuth>
            <PerformanceChatList />
          </CheckAuth>
        }
      />
      <Route
        path="/performancedetail/:id"
        component={PerformanceDetail}
        element={
          <CheckAuth>
            <PerformanceDetail />
          </CheckAuth>
        }
      ></Route>
    </Routes>
  );
}
