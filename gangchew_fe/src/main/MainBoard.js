import React from "react";
import SimpleSlider from "../component/SimpleSlider";
import MainSlider from "../component/MainSlider";
import BestRankingList from "../component/BestRankingList";

import "../main/css/MainBoard.css";


const MainBoard = () => {
  return (
    <div>
      <div id="headerarea"></div>
      <div id="container100">
        <div id="list_left"></div>
        <div className="base-center">
          <div id="carousel">
            <SimpleSlider />
          </div>
          <div className="centerBoard">
            <div className="content">


              <div className="inner-content-left">
                <div>
                  <h2  className="sliderTitle">슬라이더1</h2>
                  <MainSlider/>
                </div>
                <div>
                  <h2 className="sliderTitle">슬라이더2</h2>
                  <MainSlider />
                </div>
                
              </div>
              <div  className="inner-content-right">
                <h2>랭킹 리스트1</h2>
                <BestRankingList />
              </div>
              <div  className="inner-content-bottom">
                <div className="SliderItem">
                  <h2 className="sliderTitle">슬라이더3</h2>
                  <MainSlider isSecondSlider={true} />
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div id="list_right"></div>
      </div>
    </div>
  );
};
export default MainBoard;
