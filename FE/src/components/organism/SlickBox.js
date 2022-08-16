import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { requestUserInfo } from "../../apis/user";
import { Link } from "react-router-dom";

import { fetchChatJoin } from "../../apis/chat";

import PosterSize from "../atom/PosterSize";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default function SimpleSlider({ rooms = [] }) {
  const navigate = useNavigate();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderbackSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const cardStyle = {
    maxWidth: 300,
    width: "100vw",
    marginX: "auto",
    maxHeight: 400,
    boxShadow: 3,
    borderRadius: 10,
  };

  const cardbackStyle = {
    width: "100vw",
    height: "550px",
    boxShadow: 3,
    borderRadius: 2,
    filter: "blur(4px)",
    backgroundSize: "cover",
  };

  function getSliderItems(rooms) {
    return rooms.map(room => {
      return (
        <Card sx={cardStyle} key={room?.performance?.id}>
          <Box>
            <PosterSize
              size="large"
              src={room?.performance?.poster}
              onClick={() => navigate(`/performancedetail/${room?.performance?.id}`)}
            ></PosterSize>
          </Box>
        </Card>
      );
    });
  }

  function getSliderbackItems(rooms) {
    return rooms.map(room => {
      return (
        <Card sx={cardbackStyle} key={room?.performance?.id}>
          <Box>
            <PosterSize size="full" src={room?.performance?.poster}></PosterSize>
          </Box>
        </Card>
      );
    });
  }

  function getDefaultCard() {
    return (
      <Card sx={cardStyle}>
        <PosterSize size="large" src="enter_new_chat.png" onClick={() => navigate(`/performancechatlist`)}></PosterSize>
      </Card>
    );
  }

  function getDefaultbackCard() {
    return <Card sx={cardStyle}></Card>;
  }

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          top: "300px",
          width: "100vw",
          height: "500px",
        }}
      >
        <Slider {...sliderbackSetting} asNavFor={slider1.current} ref={slider2}>
          {rooms.length > 0 ? getSliderbackItems(rooms) : getDefaultbackCard()}
        </Slider>
      </Box>
      <Box
        sx={{
          position: "relative",
          top: "35px",
        }}
      >
        <Slider {...sliderSetting} asNavFor={slider2.current} ref={slider1}>
          {rooms.length > 0 ? getSliderItems(rooms) : getDefaultCard()}
        </Slider>
      </Box>
    </Box>
  );
}
