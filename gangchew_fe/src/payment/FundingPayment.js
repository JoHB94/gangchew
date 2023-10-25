import React, { useEffect, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { getCookie } from "../member/Cookie";

const FundingPayment = (props) => {
  const amount = props.amount;
  console.log(props.amount);
  const [isInitialized, setIsInitialized] = useState(false);
  const [title, setTitle] = useState("");
  const LOCAL_IP = "http://localhost:9000";

  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const initPayment = useCallback(() => {
    const { IMP } = window;
    IMP.init("imp67011510"); // 아임포트 가맹점 식별번호
    const data = {
      // 데이터 가상 설정
      pg: "tosspay",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: props.title,
      amount: props.amount,
      //   buyer_name: "구매자 이름",
    };

    IMP.request_pay(data, (response) => {
      if (response.success) {
        // 결제 성공 시 처리
        console.log("결제 성공", response);

        const requestData = async () => {
          try {
            const response = await axios({
              url: `${LOCAL_IP}/participants/join?funding=${props.fundingId}`,
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(`${LOCAL_IP}/participants/join?${props.fundingId}`);
            console.log("받은 데이터: ", response.data); 
            if(response.data.code === 200) {
                alert("펀딩에 성공하였습니다!");
                window.location.href = "/myactivitydetail";
            }
          } catch (error) {
            console.error("오류 발생:", error);
          }
        };
        requestData();
      } else {
        // 결제 실패 시 처리
        console.log("결제 실패", response);
      }
    });
  }, [props.amount, props.title]);

  useEffect(() => {
    const loadIamportScript = async () => {
      const { IMP } = window;
      if (!IMP) {
        // IMP 객체가 없으면 아임포트 스크립트 로드
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(script);
        script.onload = () => {
          setIsInitialized(true);
        };
      } else {
        setIsInitialized(true);
      }
    };

    loadIamportScript(); // 페이지 로드 시 아임포트 스크립트 로드 -> 결제 연결
  }, []);

  const buttonStyle = {
    width: "100%", // Automatically set the width
    height: "50px",
    backgroundColor: "#701edb",
    color: "#FFFFFF",
  };

  return (
    // <button onClick={initPayment} style={buttonStyle} disabled={!isInitialized}>
    //   결제 버튼
    // </button>
    <Button
      style={buttonStyle}
      variant="contained"
      onClick={initPayment}
      disabled={!isInitialized}
    >
      결제하기
    </Button>
  );
};

export default FundingPayment;

/*

결제 성공시(응답데이터 :Success - true) 서버로(/participant/join, get)통신을 보냄
funding_id를 요청 데이터로 보냄

*/
