import React, { useEffect, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { getCookie } from "../member/Cookie";
import { useNavigate } from "react-router-dom";

const FundingCartBtn = (props) => {
  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigate = useNavigate();
  
  const fundingStoreHandle = () => { // 버튼을 누르면 펀딩이 장바구니에 저장(클릭 후 저장 성공시 장바구니 페이지로 선택적 리다이렉트)
    const serverUrl = `${LOCAL_IP}/fundingcart/add?funding=${props.fundingId}`;
    const requestMethod = "GET";

    axios({
      method: requestMethod,
      url: serverUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        if(response.data.code === 200) { // 장바구니 추가 성공
            if(window.confirm(`${response.data.result}\n\n장바구니로 이동할까요?`)) {
                navigate("/fundingcart");
            }
        }

        if(response.data.code === 400) { // 이미 추가된 펀딩
            alert(response.data.message);
        }

      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  const buttonStyle = {
    width: "100%", 
    height: "50px",
    backgroundColor: "white",
    color: "#701edb",
  };

  return (
    
    <Button
      style={buttonStyle}
      variant=""
      onClick={fundingStoreHandle}
    >
      장바구니로 이동
    </Button>
  );
};

export default FundingCartBtn;

