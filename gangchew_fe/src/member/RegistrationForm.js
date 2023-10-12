import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Link } from "react-router-dom";
import axios from "axios";
import UseValidate from "../hooks/UseValidate";
import Button from "@mui/material/Button";
import "../member/css/RegistrationForm.css";

function RegistrationForm() {

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    fullname: "",
    email: "",
    address: "",
  });

  const {validText, isValid} = UseValidate(signupData);

  const handleInputChange = (key, value) => {
    setSignupData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serverUrl = "http://192.168.0.248:9000/signup";
    const requestMethod = "POST";

    axios({
      method: requestMethod,
      url: serverUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: signupData,
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

  /* daum 주소 api 연결 */
  const [address, setaddress] = useState("");
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl); //open함수 정의

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setaddress(fullAddress); // 주소 데이터 수집
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  /* --------- */

  return (
    <div className="colorbase">
      <div className="baseDiv">
        <div className="registrationDiv">
          <h1>회원가입</h1>
          <div className="formDiv">
            <form onSubmit={handleSubmit}>
              <div className="inputDiv1">
                <label for="username">아이디</label>
                <span>{isValid.isUsername}</span>
                <span className={`validCheck${isValid.isUsername ? "" : "-false"}`}>{validText.validUsername}</span>
                <br />
                <input
                  type="text"
                  className="username-input"
                  placeholder="아이디 입력(5~15자)"
                  id="username"
                  value={signupData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  valid={!isValid.isUsername}
                ></input>
                <button type="button" className="checkBtn">
                  중복확인
                </button>
              </div>
              <div className="inputDiv2">
                <label for="password">비밀번호</label>
                <span className={`validCheck${isValid.isPassword ? "" : "-false"}`}>{validText.validPassword}</span>
                <br />
                <input
                  type="password"
                  className="password-input"
                  placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 10~20자)"
                  id="password"
                  value={signupData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  valid={!isValid.isPassword}
                ></input>
              </div>
              <div className="inputDiv3">
                <label for="pwchk">비밀번호확인</label>
                <span className={`validCheck${isValid.isPasswordCheck ? "" : "-false"}`}>{validText.validPasswordCheck}</span>
                <br />
                <input
                  type="password"
                  className="passwordCheck-input"
                  placeholder="비밀번호 다시 입력"
                  id="pwchk"
                  value={signupData.passwordCheck}
                  onChange={(e) =>
                    handleInputChange("passwordCheck", e.target.value)
                  }
                  valid={!isValid.isPasswordCheck}
                ></input>
              </div>
              <div className="inputDiv4">
                <label for="fullname">이름</label>
                {<span className={`validCheck${isValid.isFullname ? "" : "-false"}`}>{validText.validFullname}</span>}
                <br />
                <input
                  type="text"
                  className="fullname-input"
                  placeholder="이름을 입력해주세요"
                  id="fullname"
                  value={signupData.fullname}
                  onChange={(e) =>
                    handleInputChange("fullname", e.target.value)
                  }
                  valid={!isValid.isFullname}
                ></input>
              </div>
              <div className="inputDiv5">
                <label for="nickname">닉네임</label>
                <span className={`validCheck${isValid.isNickname ? "" : "-false"}`}>{validText.validNickname}</span>
                <br />
                <input
                  type="text"
                  className="nickname-input"
                  placeholder="닉네임을 입력해주세요"
                  id="nickname"
                  value={signupData.nickname}
                  onChange={(e) =>
                    handleInputChange("nickname", e.target.value)
                  }
                  valid={!isValid.isNickname}
                ></input>
              </div>
              <div className="inputDiv6">
                <label for="email">이메일</label>
                <span className={`validCheck${isValid.isEmail ? "" : "-false"}`}>{validText.validEmail}</span>
                <br />
                <input
                  type="text"
                  className="email-input"
                  placeholder="이메일을 입력해주세요"
                  id="email"
                  value={signupData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  valid={!isValid.isEmail}
                ></input>
              </div>
              <div className="inputDiv7">
                <label for="address">주소</label>
                <br />
                <input
                  type="text"
                  className="address-input"
                  placeholder="주소"
                  id="address"
                  value={address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  readOnly
                ></input>
                <button 
                  type="button"
                  className="addressFind"
                  onClick={handleClick}
                >
                  우편번호찾기
                </button>
              </div>
              <div className="inputDiv8">
                <input
                  className="checkboxForm"
                  type="checkbox"
                  id="check"
                  value="agreement"
                />
                <label for="check">개인정보 수집 및 이용에 동의합니다.</label>
              </div>
              <div className="inputDiv9">
                <Button
                  className="submit-button"
                  color="secondary"
                  variant="contained"
                  style={{ borderRadius: "8px", width: "281px", backgroundColor: "#701edb"}}
                  type="submit"
                >
                  가입하기
                </Button>
                <Link to="/login">
                  <Button
                    className="submit-button"
                    color="secondary"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #701edb",
                      marginLeft: "3px",
                      width: "281px",
                      color: "#701edb"
                    }}
                  >
                    돌아가기
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegistrationForm;
