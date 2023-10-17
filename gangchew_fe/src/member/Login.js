import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import MemberModal from "./MemberModal";
import KakaoLoginApi from "./Kakao/KakaoLoginApi";

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
        if(response.data.isSuccess === true) {
          setCookie("jwtToken", response.data.result, {maxAge: 60 * 60}); //만료기한 1시간 설정
          alert(response.data.message); // 차후 뷰에 맞는 메세지로 변경 필요
          window.location.href = "/"; // 로그인 성공시 메인페이지로 이동
        }else if(response.data.isSuccess === false) {
          alert("아이디나 비밀번호가 잘못되었습니다.");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        // 오류 처리 코드를 추가
      });
  };
  /* --------- */

  /* 소셜 로그인 api연결 */
  
    // const requestUrl = `http://138.2.114.150:9000/login/${identifier}/callback`; // 소셜 로그인 콜백 요청 url
    // const requestMethod = "GET";

    // axios({
    //   method: requestMethod,
    //   url: requestUrl,
    // })
    // .then((response) => {
    //   console.log("서버 응답 데이터:", response.data);
    //   console.log("로그인");
    // })
    // .catch((error) => {
    //   console.error("오류 발생:", error);
    //   // 오류 처리 코드를 추가
    // });

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
                  <KakaoLoginApi />
                </li>
                <li>
                  <button
                    className="socialLogButton"
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
