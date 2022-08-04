import React from "react";

import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div>
      <p>잘못 된 경로입니다.</p>
      <Link to="/">
        <button>돌아가기</button>
      </Link>
    </div>
  );
}
