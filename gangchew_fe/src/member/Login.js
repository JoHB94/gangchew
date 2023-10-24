import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import MemberModal from "./MemberModal";
import KakaoLoginApi from "./Kakao/KakaoLoginApi";
import NaverLoginApi from "./Naver/NaverLoginApi";
import img from "../member/img/KakaoTalk_20231022_233606091_03.jpg";

import "../member/css/Login.css";
import { setCookie } from "./Cookie";

/* 로그인 데이터 전송 */
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (key, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  /* 로컬 로그인 */
  const handleSubmit = (e) => {
    e.preventDefault();

    const serverUrl = "http://localhost:9000/authenticate"; // 서버의 URL을 여기에 넣으세요
    const requestMethod = "POST";

    axios({
      method: requestMethod,
      url: serverUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: loginData,
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        if (response.data.isSuccess === true) {
          setCookie("jwtToken", response.data.result, { maxAge: 60 * 60, path: "/" }); //만료기한 1시간 설정
          alert(response.data.message); // 차후 뷰에 맞는 메세지로 변경 필요
          window.location.href = "/"; // 로그인 성공시 메인페이지로 이동
        } else if (response.data.isSuccess === false) {
          alert("아이디나 비밀번호가 잘못되었습니다.");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        // 오류 처리 코드를 추가
      });
  };
  /* --------- */

  /* 카카오 로그인 데이터 */
  const kakaoData = {
    REST_API_KEY: "c6b9f677567dc977d7f9c94dd4cc157f",
    REDIRECT_KAKAO_URI: "http://localhost:3000/login/kakao/callback",
  }
  
  /* 네이버 로그인 데이터 */
  const naverData = {
    CLIENT_ID: "dLKPNhcR1nB4hOCwthgj",
    REDIRECT_NAVER_URI: "http://localhost:3000/login/naver/callback",
    STATE: "fake",
  }
  
  /* OAuth요청 URL */
  const socialOauthUrl = {
    kakaoUrl: `https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${kakaoData.REST_API_KEY}&redirect_uri=${kakaoData.REDIRECT_KAKAO_URI}&response_type=code&scope=account_email,profile_image,profile_nickname`,
    naverUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverData.CLIENT_ID}&state=${naverData.STATE}_STRING&redirect_uri=${naverData.REDIRECT_NAVER_URI}`,
  }
  /* ------------------ */

  return (
    <div>
      <div className="container">
        <div className="left"><img src={img} alt="left" style={{width: "100%", height: "99vh", objectFit: "cover", transform: "scaleY(1.0195)"}}></img></div>

        <div className="right">
          <div className="login-form">
            <div className="login-input">
              <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <p className="logo-name">GangChew</p>
                  <p>
                    <input
                      type="text"
                      className="input-id"
                      placeholder="Enter id"
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                    />
                  </p>
                  <input
                    type="password"
                    className="input-password"
                    placeholder="Enter password"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <div className="join-link">
                    <p>
                      아직 회원이 아니신가요?
                      <MemberModal socialUrlArray={socialOauthUrl}/>
                    </p>
                  </div>
                </div>
                <div className="action">
                  <Button
                    className="submit-button"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#701edb",
                      color: "white",
                    }}
                    type="submit"
                  >
                    login
                  </Button>
                </div>
              </form>
            </div>
            {/* api 로그인 접속 링크 버튼 */}
            <div className="api-login">
              <hr />
              <p>SNS로 간편로그인</p>
              <ul className="api-login-button">
                <li>
                  <KakaoLoginApi kakaoUrl={socialOauthUrl.kakaoUrl}/>
                </li>
                <li>
                  <NaverLoginApi naverUrl={socialOauthUrl.naverUrl}/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
