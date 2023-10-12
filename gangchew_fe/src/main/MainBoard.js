import React from "react";
import SimpleSlider from "../component/SimpleSlider";
import MainSlider from "../component/inputs/MainSlider";


import "../main/css/MainBoard.css";
import Card from "../component/Card";


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
                <div className="content-left">
                <div>
                    <MainSlider/>
                </div>
                <div>
                    <MainSlider/>
                </div>
                <div>
                    <MainSlider/>
                </div>
                <div>
                    <MainSlider/>
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
