import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/system";

import TwitterItem from "../molecule/TwitterItem";

import { requestTweet } from "../../apis/twitter";

const TwitterItemBox = styled(Box)`
  width: 90vw;
  height: 50vh;

  margin: auto;
  padding: 3%;

  border: solid;
  border-color: ${props => props.theme.palette.primary.main};
  border-radius: 10px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
`;

export default function TwitterBox() {
  const [tweet, setTweet] = React.useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  function requestTweetSuccess(res) {
    setTweet(res.data);
  }

  function requestTweetFail(err) {
    setTweet([]);
  }

  useEffect(() => {
    requestTweet(requestTweetSuccess, requestTweetFail);
  }, []);
  return <TwitterItemBox>{getTweetList(tweet, currentTime)}</TwitterItemBox>;
}

function getTweetList(tweets, currentTime) {
  return tweets.map(tweet => {
    return (
      <TwitterItem
        key={tweet.id}
        content={tweet.contents}
        url={tweet.url}
        time={tweet.time}
        currentTime={currentTime}
      />
    );
  });
}
