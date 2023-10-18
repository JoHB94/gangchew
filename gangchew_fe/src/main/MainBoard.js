import React, { useState, useEffect } from "react";
import SimpleSlider from "../component/SimpleSlider";
import MainSlider from "../component/MainSlider";
import MainSlider2 from "../component/MainSlider2";
import MainSlider3 from "../component/MainSlider3";
import BestRankingList from "../component/BestRankingList";
import axios from "axios";

import "../main/css/MainBoard.css";

const MainBoard = () => {
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 통신이 완료된 후 페이지를 띄울 수 있도록 로딩처리

  const requestUrl = "http://localhost:9000/funding/all";
  const requestMethod = "GET";

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios({
          url: requestUrl,
          method: requestMethod,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setDataArray(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("오류 발생:", error);
        setLoading(false);
      }
    };

    requestData();
  }, []);
  if (loading === true) {
    console.log(loading);
    return <div></div>;
  
  } else { // 통신 완료시 페이지 띄움
    console.log(loading);
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
                    <h2 className="sliderTitle">슬라이더1</h2>
                    <MainSlider dataArray={dataArray} />
                  </div>
                  <div>
                    <h2 className="sliderTitle">슬라이더2</h2>
                    <MainSlider2 />
                  </div>
                </div>
                <div className="inner-content-right">
                  <h2>랭킹 리스트1</h2>
                  <BestRankingList dataArray={dataArray} />
                </div>
                <div className="inner-content-bottom">
                  <div className="SliderItem">
                    <h2 className="sliderTitle">슬라이더3</h2>
                    <MainSlider3 isSecondSlider={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="list_right"></div>
        </div>
      </div>
    );
  }
};
export default MainBoard;
