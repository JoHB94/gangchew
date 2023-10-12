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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const imgs = ['/carousel001.jpg','/carousel002.jpg','/carousel003.jpg',];
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