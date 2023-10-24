import React, { useEffect, useCallback, useState } from "react";

const FundingPayment = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const initPayment = useCallback(() => {
    const { IMP } = window;
    IMP.init("imp67011510"); // 아임포트 가맹점 식별번호
    const data = { // 데이터 가상 설정
      pg: "kakaopay.TC0ONETIME",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: "강츄 펀딩 결제",
      amount: 1000,
      buyer_email: "example@example.com",
      buyer_name: "구매자 이름",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구",
      buyer_postcode: "123-456",
    };

    IMP.request_pay(data, (response) => {
      if (response.success) {
        // 결제 성공 시 처리
        console.log("결제 성공", response);
      } else {
        // 결제 실패 시 처리
        console.log("결제 실패", response);
      }
    });
  }, []);

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

  return (
    <button onClick={initPayment} disabled={!isInitialized}>
      결제 버튼
    </button>
  );
};

export default FundingPayment;

/*

결제 성공시(응답데이터 :Success - true) 서버로(/participant/join, get)통신을 보냄
funding_id를 요청 데이터로 보냄

*/