import React, { Component } from "react";
import Slider from "react-slick";
import Card from "./Card";

import "./css/MainSlider.css";
import { SlideItem, SlideContainer } from "./MainSliderStyled";

export default class MainSlider3 extends Component {
  /* 반응형 속성 조건부 렌더링 */
  constructor(props) {
    super(props);
    this.responsiveSettings = [
      // 반응형 속성 설정
      {
        breakpoint: 2890,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplaySpeed: 2400,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          initialSlide: 1, // 초기 슬라이드 위치
          autoplaySpeed: 1700,
        },
      },
    ];

    if (props.isSecondSlider) {
      this.responsiveSettings.unshift({
        breakpoint: 2400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      });

      this.responsiveSettings[1] = {
        breakpoint: 2300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplaySpeed: 2400,
        },
      };

      this.responsiveSettings[2] = {
        breakpoint: 1410,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplaySpeed: 2400,
        },
      };

      this.responsiveSettings[3] = {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplaySpeed: 1700,
        },
      };
    }
  }

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
      dots: false,
      responsive: this.responsiveSettings,
    };

    return (
      <SlideContainer>
        <Slider {...settings}>
          <SlideItem>
            {/* 카드 컴포넌트 넣을 자리 */}
          </SlideItem>
        </Slider>
      </SlideContainer>
    );
  }
}
