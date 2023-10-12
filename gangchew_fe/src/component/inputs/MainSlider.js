import React, { Component } from "react";
import Slider from "react-slick";
import Card from "../Card";

import "../css/MainSlider.css";
import { SlideItem, SlideContainer } from "./MainSliderStyled";

export default class MainSlider extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 5,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 500,
      dots: true,
      responsive: [           // 반응형 속성 설정
      {
        breakpoint: 2800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    {
      breakpoint: 1550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1120,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        initialSlide: 1,      // 초기 슬라이드 위치
      },
    },
  ],
    };

    return (
      <SlideContainer>
        <Slider {...settings}>
          <SlideItem>
            <Card />
          </SlideItem>
          <SlideItem>
            <Card />
          </SlideItem>
          <SlideItem>
            <Card />
          </SlideItem>
          <SlideItem>
            <Card />
          </SlideItem>
          <SlideItem>
            <Card />
          </SlideItem>
          <SlideItem>
            <Card />
          </SlideItem>
        </Slider>
      </SlideContainer>
    );
  }
}
