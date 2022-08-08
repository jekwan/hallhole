import React from "react";

import { Link } from "react-router-dom";

import storage from "../../helper/storage";

export default function NoMatch() {
  function logout() {
    storage.remove("token");
  }
  return (
    <div>
      <p>잘못 된 경로입니다.</p>
      <Link to="/">
        <button>돌아가기</button>
        <button onClick={logout}>로그 아웃</button>
      </Link>
      <Link to="/profile">
        <button>프로필 화면 가기</button>
      </Link>
      <Link to="/followlist">
        <button>팔로워리스트 확인</button>
      </Link>
      <Link to="/forgot">
        <button>비번 찾기 위한 이메일 페이지</button>
      </Link>
      <Link to="/transmit">
        <button>이메일 전송 확인 페이지</button>
      </Link>
      <Link to="/editprofile">
        <button>개인정보 수정 페이지</button>
      </Link>
      <Link to="/editholy">
        <button>캐릭터 꾸미기 페이지</button>
      </Link>
      <Link to="/performance">
        <button>채팅방 공연 리스트 페이지</button>
      </Link>
    </div>
  );
}
