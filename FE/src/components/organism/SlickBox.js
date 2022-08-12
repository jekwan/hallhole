import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PosterSize from "../atom/PosterSize";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export default class SimpleSlider extends Component {
  render() {
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

    return (
      <Box>
        <Slider {...settings}>
          <Box>
            <Card sx={posterCard}>
              <Box>
                <PosterSize
                  size="large"
                  src="https://cdnticket.melon.co.kr/resource/image/upload/product/2019/11/2019112812171593082da1-3771-458f-ab20-7777146d2066.jpg"
                ></PosterSize>
              </Box>
            </Card>
          </Box>
          <Card sx={posterCard}>
            <Box>
              <PosterSize
                size="large"
                src="http://ticketimage.interpark.com/Play/image/large/22/22008801_p.gif"
              ></PosterSize>
            </Box>
          </Card>
          <Card sx={posterCard}>
            <Box>
              <PosterSize
                size="large"
                src="http://tkfile.yes24.com/upload2/PerfBlog/202201/20220113/20220113-41225.jpg"
              ></PosterSize>
            </Box>
          </Card>
          <Card sx={posterCard}>
            <Box>
              <PosterSize
                size="large"
                src="http://tkfile.yes24.com/upload2/PerfBlog/202207/20220701/20220701-42653.jpg"
              ></PosterSize>
            </Box>
          </Card>
        </Slider>
      </Box>
    );
  }
}
