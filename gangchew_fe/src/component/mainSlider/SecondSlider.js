import React, { Component } from "react";
import Slider from "react-slick";
import SecondCard from "../card/SecondCard";

import "../css/MainSlider.css";
import { SlideItem, SlideContainer } from "../MainSliderStyled";

export default class SecondSlider extends Component {
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
          initialSlide: 0,
          infinite: true,
          dots: true,
          autoplaySpeed: 2600,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
          autoplaySpeed: 2400,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          initialSlide: 1, // 초기 슬라이드 위치
          autoplaySpeed: 1700,
        },
      },
    ];
  }

  render() {
    const { dataArray } = this.props;

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
      responsive: this.responsiveSettings,
    };
    console.log(dataArray);
    const ObArray = dataArray.map(
      (
        item // 배열 개수만큼 컴포넌트 출력
      ) => (
        <SlideItem key={item}>
          <SecondCard data={item.funding} rate={item.achievementrate} like={item.liked}/>
        </SlideItem>
      )
    );

    return (
      <SlideContainer>
        <Slider {...settings}>
          {/* {loopUI()} */}
          {ObArray}
        </Slider>
      </SlideContainer>
    );
  }
}
