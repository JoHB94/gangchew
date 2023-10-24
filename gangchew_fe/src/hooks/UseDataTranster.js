import { useState, useEffect } from "react";
import axios from "axios";

const useDataTransfer = (orderbyIndex, topNum, state, criteria, hours) => {
  // 외부에서 상수를 받아옴(criteria: useeffect를 선택호출하기위한 구분기준 -> 1 or 2 선택)
  const [fundingData, setFundingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestUrl = "http://localhost:9000/funding/rank";
  const orderbyOptions = [
    "newest",
    "deadline",
    "mostView",
    "mostParticipants",
    "mostLike",
  ];
  const requestMethod = "GET";

  useEffect(() => {
    if (criteria === 1) {
      //criteria == 1을 설정할 경우 실시간 랭킹 출력
      console.log(criteria)
      console.log("criteria="+criteria+"가 전달됨 : "+orderbyOptions[orderbyIndex]+"에 해당하는 데이터가 출력됩니다!");
      console.log("전달 데이터" + `${requestUrl}?orderby=${orderbyOptions[orderbyIndex]}&top=${topNum}&state=${state}&hours=${hours}`)
      const requestData = async () => {
        try {
          const response = await axios({
            url: `${requestUrl}?orderby=${orderbyOptions[orderbyIndex]}&top=${topNum}&state=${state}&hours=${hours}`,
            method: requestMethod,
            headers: {
              "Content-Type": "application/json",
            },
          });

          setFundingData(response.data.result);
          setLoading(false);
        } catch (error) {
          console.error("오류 발생:", error);
          setLoading(false);
        }
      };
      
      requestData();
    } else {
        console.log(criteria)
      const requestData = async () => {
          console.log(orderbyOptions[orderbyIndex]+"에 해당하는 데이터가 출력됩니다!");
        try {
          const response = await axios({
            url: `${requestUrl}?orderby=${orderbyOptions[orderbyIndex]}&top=${topNum}&state=${state}`,
            method: requestMethod,
            headers: {
              "Content-Type": "application/json",
            },
          });

          setFundingData(response.data.result);
          setLoading(false);
        } catch (error) {
          console.error("오류 발생:", error);
          setLoading(false);
        }
      };

      requestData();
    }
  }, [orderbyIndex]);

  return { fundingData, loading };
};

export default useDataTransfer;
