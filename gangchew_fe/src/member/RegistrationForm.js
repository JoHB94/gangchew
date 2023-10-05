import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import "../member/css/RegistrationForm.css";

function RegistrationForm() {
    const [address, setaddress] = useState('');
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

  return (
    <div className="colorbase">
      <div className="baseDiv">
        <div className="registrationDiv">
          <h1>회원가입</h1>
          <div className="formDiv">
            <form>
              <div className="inputDiv1">
                <label for="id">아이디</label>
                <br />
                <input
                  type="text"
                  className="id-input"
                  placeholder="아이디 입력(5~15자)"
                  id="id"
                ></input>
                <button type="button" className="checkBtn" >중복확인</button>
              </div>
              <div className="inputDiv2">
                <label for="pw">비밀번호</label>
                <br />
                <input
                  type="password"
                  className="password-input"
                  placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 10~20자)"
                  id="pw"
                ></input>
              </div>
              <div className="inputDiv3">
                <label for="pwchk">비밀번호확인</label>
                <br />
                <input
                  type="password"
                  className="passwordCheck-input"
                  placeholder="비밀번호 다시 입력"
                  id="pwchk"
                ></input>
              </div>
              <div className="inputDiv4">
                <label for="name">이름</label>
                <br />
                <input
                  type="text"
                  className="name-input"
                  placeholder="이름을 입력해주세요"
                  id="name"
                ></input>
              </div>
              <div className="inputDiv5">
                <label for="nickname">닉네임</label>
                <br />
                <input
                  type="text"
                  className="nickname-input"
                  placeholder="닉네임을 입력해주세요"
                  id="nickname"
                ></input>
              </div>
              <div className="inputDiv6">
                <label for="email">이메일</label>
                <br />
                <input
                  type="text"
                  className="email-input"
                  placeholder="이메일을 입력해주세요"
                  id="email"
                ></input>
              </div>
              <div className="inputDiv7">
                <label for="">주소</label>
                <br />
                <input
                  type="text"
                  className="address-input"
                  placeholder="우편번호"
                  id="email"
                  value={address}
                  readOnly
                ></input>
                <button type="button" className="addressFind" onClick={handleClick}>
                  우편번호찾기
                </button>
                <input
                  type="text"
                  className="address-input"
                  placeholder="주소"
                  readOnly
                ></input>
              </div>
              <div className="inputDiv8">
                <input
                  className="checkboxForm"
                  type="checkbox"
                  name=""
                  value="agreement"
                />
                <label>개인정보 수집 및 이용에 동의합니다.</label>
              </div>
              <div className="inputDiv9">
                <Button
                  className="submit-button"
                  color="secondary"
                  variant="contained"
                  style={{ borderRadius: "8px", width: "281px" }}
                >
                  가입하기
                </Button>
                <Link to="/login"><Button
                  className="submit-button"
                  color="secondary"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid",
                    marginLeft: "3px",
                    width: "281px",
                  }}
                >
                  돌아가기
                </Button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegistrationForm;
