import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { requestUserInfo } from "../../apis/user";
import { Link } from "react-router-dom";

import { fetchChatJoin } from "../../apis/chat";

import PosterSize from "../atom/PosterSize";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default function SlickBox({ id }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const posterCard = {
    maxWidth: 300,
    width: "100vw",
    marginX: "auto",
    maxHeight: 400,
    boxShadow: 3,
    borderRadius: 10,
  };

  const [joined, setJoined] = useState([]);

  useEffect(() => {
    fetchChatJoin(id, getJoinedSuccess, getJoinedFail);
  }, [id]);

  function getJoinedSuccess(res) {
    setJoined(res.data);
  }

  function getJoinedFail(err) {}

  return (
    <Box>
      <Slider {...settings}>
        {joined?.map(item => (
          <Card key={item.performance.id} sx={posterCard}>
            <PosterSize size="large" src={item.performance.poster} />
          </Card>
        ))}
      </Slider>
    </Box>
  );
}
