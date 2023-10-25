import React, { useState, useEffect } from "react";
import axios from "axios";

const KakaoPayment = () => {
  const [paymentData, setPaymentData] = useState({
    next_redirect_pc_url: "",
    tid: "",
  });

  useEffect(() => {
    const params = {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/myactivitydetail",
      fail_url: "http://localhost:3000/myactivitydetail",
      cancel_url: "http://localhost:3000/myactivitydetail",
    };

    axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK c0d026ab03eee1c1a97749b87e53aa89",
        "Content-type": "application/json",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      setPaymentData({ next_redirect_pc_url, tid });

      // 백엔드 호출
    });
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  const { next_redirect_pc_url } = paymentData;

  return (
    <div>
      <h2>Pay page</h2>
      <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a>
    </div>
  );
};

export default KakaoPayment;
