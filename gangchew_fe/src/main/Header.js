import * as React from "react";
import header from "../main/css/header.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { getCookie } from "../member/Cookie";

const Header = () => {
  /* 헤더 랜더링 구분 로직 */
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/selectRegistration" ||
    window.location.pathname === "/mainSlider" ||
    window.location.pathname === "/bestRankingList" ||
    window.location.pathname === "/registration"
  )
    return null;
  
  /* 로그아웃 처리할 부분 */
  const logoutHandle = (event) => {
    const requestUrl = "http://138.2.114.150:9000/authenticate/logout"; 
    const requestMethod = "POST";

    axios({
      method: requestMethod,
      url: requestUrl,
      
      withCredentials: true // 쿠키 정보를 요청 헤더에 포함
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  };

  return (
    <div>
      <div id="scroll_wrapper">
        <div id="container80">
          <div id="container_left">
            <div id="h_title">
              <h2 id="h_h2">GangChew</h2>
            </div>

            <ul id="list">
              <li id="container33">펀딩list</li>
              <li id="container33">펀딩작성</li>
              <li id="container33">요청list</li>
            </ul>
          </div>
          <div id="container_right">
            <div id="search">
              <input type="text"></input>
              <button>검색</button>
            </div>
            <div id="member">
              <div id="container33">
                <button>로그인</button>
              </div>
              <div id="container33" onClick={logoutHandle}>
                <button>로그아웃</button>
              </div>
              <div id="container33">
                <button>알 림</button>
              </div>
              <div id="container33">
                <button>프로필</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
