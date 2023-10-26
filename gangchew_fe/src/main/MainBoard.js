import React, { useState, useEffect } from "react";
import SimpleSlider from "../component/SimpleSlider";
import FirstSlider from "../component/mainSlider/FirstSlider";
import SecondSlider from "../component/mainSlider/SecondSlider";
import ThirdSlider from "../component/mainSlider/ThirdSlider";
import BestRankingList from "../component/BestRankingList";
import UseDataTransfer from "../hooks/UseDataTranster";
import axios from "axios";

import "../main/css/MainBoard.css";

const MainBoard = () => {

  const { fundingData: bestRankDataArray,  loading: bestRankLoading  } = UseDataTransfer(3, 5, "ACTIVE", 1, 24);
  const { fundingData: newestDataArray, loading: newestLoading  } = UseDataTransfer(0, 10, "IN_PROGRESS", 0);
  const { fundingData: mostViewDataArray,  loading: mostViewLoading  } = UseDataTransfer(2, 10, "IN_PROGRESS", 0);
  const { fundingData: deadlineDataArray,  loading: deadlineLoading  } = UseDataTransfer(1, 10, "IN_PROGRESS", 0);

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
            {newestLoading || mostViewLoading || deadlineLoading || bestRankLoading ? (
              <div className="blankPage"></div>
            ) : (
              <div className="content">
                <div className="inner-content-left">
                  <div>
                    <h2 className="sliderTitle">새로 오픈한 펀딩</h2>
                    <FirstSlider dataArray={newestDataArray}/>
                  </div>
                  <div>
                    <h2 className="sliderTitle">뜨거운 관심 펀딩</h2>
                    <SecondSlider  dataArray={deadlineDataArray}/>
                  </div>
                </div>
                <div className="inner-content-right">
                  <h2>실시간 랭킹</h2>
                  <BestRankingList dataArray={bestRankDataArray}/>
                </div>
                <div className="inner-content-bottom">
                  <div className="SliderItem">
                    <h2 className="sliderTitle">마감이 임박한 펀딩</h2>
                    <ThirdSlider isSecondSlider={true}  dataArray={mostViewDataArray}/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="list_right"></div>
      </div>
    </div>
  );
};
export default MainBoard;
