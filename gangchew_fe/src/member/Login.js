import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import MemberModal from "./MemberModal";

import "../member/css/Login.css";
import { getCookie, setCookie } from "./Cookie";

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

    const serverUrl = "http://138.2.114.150:9000/authenticate"; // 서버 URL
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
        const isSuccess = response.data.isSuccess;
        console.log("서버 응답 데이터:", response);
        if (isSuccess === true) {
          setCookie("jwtToken" ,response.data.result); // 쿠키 저장
          console.log(getCookie("jwtToken"))
          alert("로그인 성공!");
          window.location.href = "/main";
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        // 오류 처리 코드를 추가
      });
  };
  /* --------- */

  /* 소셜 로그인 api연결 */
  const socialLogin = (identifier) => {
    const socialUrl = `http://138.2.114.150:9000/oauth2/authorization/${identifier}`; // 소셜 로그인 페이지로 리다이렉트
    window.location.href = socialUrl;

    const requestUrl = `http://138.2.114.150:9000/login/${identifier}/callback`;
    const requestMethod = "GET";

    axios({
      method: requestMethod,
      url: requestUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data.isSuccess);
        if (response.data.isSuccess === true);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        // 오류 처리 코드를 추가
      });
  };

  return (
    <div>
      <div className="container">
        <div className="left">left</div>

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
                      <MemberModal />
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
                  <button
                    className="socialLogButton"
                    onClick={() => socialLogin("kakao")}
                  >
                    <div className="kakao-icon">
                      <RiKakaoTalkFill
                        size={45}
                        style={{
                          color: "#341808",
                          backgroundColor: "yellow",
                          borderRadius: "5px",
                        }}
                      />
                      <li>kakao</li>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="socialLogButton"
                    onClick={() => socialLogin("naver")}
                  >
                    <div className="naver-icon">
                      <SiNaver size={25} style={{ color: "white" }} />
                      <li className="">naver</li>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="socialLogButton"
                    onClick={() => socialLogin("facebook")}
                  >
                    <div className="facebook-icon">
                      <BsFacebook
                        size={45}
                        style={{ color: "blue", paddingBottom: "5px" }}
                      />
                      <li>facebook</li>
                    </div>
                  </button>
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
