import React, { useState, useEffect } from "react";
import { getCookie } from "./Cookie";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Link } from "react-router-dom";
import axios from "axios";
import UseValidate from "../hooks/UseValidate";
import Button from "@mui/material/Button";
import "../member/css/UserPage.css";

const UserPage = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    nickname: "",
    fullname: "",
    email: "",
    address: "",
  });

  const [updateStart, setUpdateStart] = useState(false);
  const updateHandle = (e) => {
    e.preventDefault();
    setUpdateStart(true);
  };

  /* 유저정보 불러오기 */
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios({
          url: `http://localhost:9000/user/myinfo`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setSignupData(response.data.result);
        console.log("내가 받은 데이터 : ", signupData);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    requestData();
  }, []);
  /* ------------- */

  /* 유효성 검증 */
  const { validText, isValid } = UseValidate(signupData);

  const handleInputChange = (key, value) => {
    setSignupData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  /* 양식 폼 제출 */
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = {
      // 유효성 검증 대상이되는 항목 중 일부 제외
      isPassword: true,
      isPasswordCheck: true,
    };

    const { password, passwordCheck, ...rest } = isValid;
    console.log(password);
    console.log(signupData);
    const isValidAllTrue = Object.values(rest).every((value) => value === true); // isValid 객체의 모든 요소가 true인지 확인

    const serverUrl = "http://localhost:9000/user/update";
    const requestMethod = "POST";

    if (isValidAllTrue) {
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
          if(response.data.code === 200) {
          alert(response.data.message);
          window.location.href = "/";
          }

          if(response.data.code === 400) {
            alert("공란을 마저 입력해주세요!");
          }

        })
        .catch((error) => {
          console.error("오류 발생:", error);
          alert("오류가 발생했습니다.")
        });
    } else {
      console.log("정보 수정 유효성 검증 실패");
      alert("오류발생");
    }
  };

  /* daum 주소 api 연결 */
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl); //open함수 정의

  const handleComplete = (data) => {
    let fullAddress = data.address;
    // console.log(fullAddress); 테스트용 콘솔
    let extraAddress = "";

    if (data.addressType === "R") {
      // 도로명 주소인 경우만 추가정보 수집
      if (data.bname !== "") {
        extraAddress += data.bname; // 법정동 이름
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName; // 건물 이름
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setSignupData((prevData) => ({
      ...prevData,
      address: fullAddress,
    })); // 주소 데이터 수집
    //console.log(fullAddress); 테스트용 콘솔
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  /* --------- */
  return (
    <div className="colorbase-user">
      <div className="baseDiv-user">
        <div className="registrationDiv-user">
          <h1>MyPage</h1>
          <div className="formDiv-user"></div>
          <form onSubmit={handleSubmit}>
            <div className="inputDiv1">
              <label for="username">아이디</label>
              <span
                className={`validCheck${isValid.isUsername ? "" : "-false"}`}
              >
              </span>
              <br />
              <input
                type="text"
                className="username-input"
                placeholder="아이디 입력(5~15자)"
                id="username"
                value={signupData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                valid={!isValid.isUsername}
                style={{backgroundColor: "lightgray"}}
                readOnly
              ></input>
            </div>

            <div className="inputDiv4">
              <label for="fullname">이름</label>
              {
                <span
                  className={`validCheck${isValid.isFullname ? "" : "-false"}`}
                >
                  {updateStart === false ? "" : validText.validFullname}
                </span>
              }
              <br />
              <input
                type="text"
                className="fullname-input"
                placeholder="이름을 입력해주세요"
                id="fullname"
                value={signupData.fullname}
                onChange={(e) => handleInputChange("fullname", e.target.value)}
                valid={!isValid.isFullname}
                readOnly={updateStart === false ? true : false}
              ></input>
            </div>
            <div className="inputDiv5">
              <label for="nickname">닉네임</label>
              <span
                className={`validCheck${isValid.isNickname ? "" : "-false"}`}
              >
                {updateStart === false ? "" : validText.validNickname}
              </span>
              <br />
              <input
                type="text"
                className="nickname-input"
                placeholder="닉네임을 입력해주세요"
                id="nickname"
                value={signupData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                valid={!isValid.isNickname}
                readOnly={updateStart === false ? true : false}
              ></input>
            </div>
            <div className="inputDiv6">
              <label for="email">이메일</label>
              <span className={`validCheck${isValid.isEmail ? "" : "-false"}`}>
                {updateStart === false ? "" : validText.validEmail}
              </span>
              <br />
              <input
                type="text"
                className="email-input"
                placeholder="이메일을 입력해주세요"
                id="email"
                value={signupData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                valid={!isValid.isEmail}
                readOnly={updateStart === false ? true : false}
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
                value={signupData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                readOnly
              ></input>
              {updateStart === false ? (
                ""
              ) : (
                <button
                  type="button"
                  className="addressFind"
                  onClick={handleClick}
                >
                  우편번호찾기
                </button>
              )}
            </div>

            <div className="inputDiv9">
              {updateStart === false ? (
                <Button
                  className="submit-button"
                  color="secondary"
                  variant="contained"
                  style={{
                    borderRadius: "8px",
                    width: "281px",
                    backgroundColor: "#701edb",
                  }}
                  type="button"
                  onClick={updateHandle}
                >
                  수정하기
                </Button>
              ) : (
                <Button
                  className="submit-button"
                  color="secondary"
                  variant="contained"
                  style={{
                    borderRadius: "8px",
                    width: "281px",
                    backgroundColor: "#701edb",
                  }}
                  type={updateStart === true ? "submit" : "button"}
                >
                  수정완료
                </Button>
              )}
              <Link to="/">
                <Button
                  className="submit-button"
                  color="secondary"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #701edb",
                    marginLeft: "3px",
                    width: "281px",
                    color: "#701edb",
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
  );
};
export default UserPage;
