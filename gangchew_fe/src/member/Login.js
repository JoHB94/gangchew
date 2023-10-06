import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";

import "../member/css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange_username = (e) => {
    setUsername(e.target.value);
  };

  const handleChange_password = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost:9000/authenticate";
    const requestMethod = "POST";

    const loginData = {
      username: username,
      password: password,
    };

    axios({
      method: requestMethod,
      url: baseUrl,
      Data: loginData,
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        // 로그인 성공 또는 실패에 따라 적절한 작업을 이곳에 추가
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
                      value={username}
                      onChange={handleChange_username}
                    />
                  </p>
                  <input
                    type="password"
                    className="input-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange_password}
                  />
                  <div className="join-link">
                    <p>
                      아직 회원이 아니신가요?{" "}
                      <Link to="/selectRegistration">회원가입</Link>
                    </p>
                  </div>
                </div>
                <div className="action">
                  <Button
                    className="submit-button"
                    color="secondary"
                    variant="contained"
                    style={{ borderRadius: "8px" }}
                    type="submit"
                  >
                    login
                  </Button>
                </div>
              </form>
            </div>
            <div className="api-login">
              <hr />
              <p>SNS로 간편로그인</p>
              <ul className="api-login-button">
                <li>
                  <span>
                    <div>api Image</div>
                    kakao
                  </span>
                </li>
                <li>
                  <span>
                    <div>api Image</div>
                    naver
                  </span>
                </li>
                <li>
                  <span>
                    <div>api Image</div>
                    facebook
                  </span>
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
