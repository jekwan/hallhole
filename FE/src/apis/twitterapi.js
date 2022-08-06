import React, { useState } from "react";
import axios from "axios";
import Button from "../components/atom/Button";

function Test() {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get("http://i7a401.p.ssafy.io:8081/twitter/");
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        {<textarea rows={12} value={JSON.stringify(data, null, 2)} readOnly={true} />}
        <Button onClick={onClick} variant="grey">
          새로 고침
        </Button>
      </div>
    </div>
  );
}

export default Test;
