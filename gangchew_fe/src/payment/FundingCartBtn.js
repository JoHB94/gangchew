import React, { useEffect, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { getCookie } from "../member/Cookie";

const FundingCartBtn = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const initPayment = useCallback(() => {
    const { IMP } = window;
    IMP.init("imp67011510"); // 아임포트 가맹점 식별번호
    const data = {
      // 데이터 가상 설정
      pg: props.paymentMethod,
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
            if(response.data.result ==="펀딩에 참여되었습니다. ") {
                alert("펀딩에 성공하였습니다!");
                window.location.href = "/myactivitydetail";
            }else {
              alert("이미 참여된 펀딩입니다!")
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
  }, [props.amount, props.title, props.paymentMethod]);

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
    backgroundColor: "white",
    color: "#701edb",
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
      장바구니로 이동
    </Button>
  );
};

export default FundingCartBtn;

/*

결제 성공시(응답데이터 :Success - true) 서버로(/participant/join, get)통신을 보냄
funding_id를 요청 데이터로 보냄

*/
