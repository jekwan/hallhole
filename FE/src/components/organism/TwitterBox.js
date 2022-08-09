import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/system";

import TwitterItem from "../molecule/TwitterItem";

import { requestTweet } from "../../apis/twitter";

const TwitterItemBox = styled(Box)`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
`;

export default function TwitterBox() {
  const [tweet, setTweet] = React.useState([]);

  function requestTweetSuccess(res) {
    setTweet(res.data);
    console.log("트윗 요청 성공", res);
  }

  function requestTweetFail(err) {
    console.log("트윗 요청 실패", err);
  }

  useEffect(() => {
    requestTweet(requestTweetSuccess, requestTweetFail);
  }, []);
  return (
    <Box
      sx={{
        width: 330,
        height: 330,
        marginX: "auto",
        border: 2,
        borderColor: "SteelBlue",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          margin: 1,
          width: 35,
          backgroundColor: "SteelBlue",
          marginLeft: "85%",
          marginTop: -0.5,
          height: 60,
        }}
      >
        <TwitterIcon style={{ color: "white" }} fontSize="large" />
      </Box>
      <Box
        sx={{
          margin: 1,
          width: 35,
          height: 35,
          backgroundColor: "white",
          marginLeft: "85%",
          marginTop: -2.5,
          transform: "rotate(45deg)",
        }}
      ></Box>
      <TwitterItemBox>{getTweetList(tweet)}</TwitterItemBox>
    </Box>
  );
}

function getTweetList(tweets) {
  console.log(tweets);
  return tweets
    .map(tweet => {
      return <TwitterItem key={tweet.id} content={tweet.contents} url={tweet.url} />;
    })
    .reverse();
}
