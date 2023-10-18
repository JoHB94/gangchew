import React, { useState, useEffect } from "react";
import SimpleSlider from "../component/SimpleSlider";
import FirstSlider from "../component/mainSlider/FirstSlider";
import SecondSlider from "../component/mainSlider/SecondSlider";
import ThirdSlider from "../component/mainSlider/ThirdSlider";
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
            {loading ? (
              <div></div>
            ) : (
              <div className="content">
                <div className="inner-content-left">
                  <div>
                    <h2 className="sliderTitle">슬라이더1</h2>
                    <FirstSlider dataArray={dataArray} />
                  </div>
                  <div>
                    <h2 className="sliderTitle">슬라이더2</h2>
                    <SecondSlider dataArray={dataArray} />
                  </div>
                </div>
                <div className="inner-content-right">
                  <h2>랭킹 리스트1</h2>
                  <BestRankingList />
                </div>
                <div className="inner-content-bottom">
                  <div className="SliderItem">
                    <h2 className="sliderTitle">슬라이더3</h2>
                    <ThirdSlider isSecondSlider={true} dataArray={dataArray} />
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
