import Button from "@mui/material/Button";

import "../member/css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="left">left</div>

        <div className="right">
          <div className="login-form">
            <div className="login-input">
              <form className="form">
                <div className="input-group">
                  <p className="logo-name">GangChew</p>
                  <p>
                    <input
                      type="text"
                      className="input-id"
                      placeholder="Enter id"
                    />
                  </p>
                  <input
                    type="password"
                    className="input-password"
                    placeholder="Enter password"
                  />
                  <div className="join-link">
                    <p>
                      아직 회원이 아니신가요? <Link to="/selectRegistration">회원가입</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="action">
              <Button
                className="submit-button"
                color="secondary"
                variant="contained"
                style={{ borderRadius: "8px" }}
              >
                login
              </Button>
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
