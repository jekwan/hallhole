import React from "react";
import { Routes, Route } from "react-router-dom";

import Intro from "../components/page/Intro-pinterest";
import NoMatch from "../components/page/NoMatch";
import Profile from "../components/page/Profile";
import Main from "../components/page/Main";

export default function RouterConfiguration() {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
      <Route path="/" element={<Intro />} />
      <Route path="/signin" element={<Profile />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
