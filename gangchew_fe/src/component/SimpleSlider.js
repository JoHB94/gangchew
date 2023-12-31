import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import simpleSlider from "../component/css/simpleSlider.css"

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 2400,
    };

    const imgs = ['/gangchewSlider01.png','/gangchewSlider02.png','/gangchewSlider03.png',];
    return (
      <div id="sliderSize">
        
        <Slider {...settings}>
          {imgs.map((imgPath, index) => (
            <div key={index} id="sliderContainer">
              <img id="sliderImg" src={process.env.PUBLIC_URL + imgPath} alt={`Image ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}