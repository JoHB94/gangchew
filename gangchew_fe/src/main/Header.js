import * as React from "react";
import header from "../main/css/header.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MessageBadge from "../component/MessageBadge";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import SearchBar from "../component/inputs/SearchBar";
import MessageDrop from "./MessageDrop";
import axios from "axios";
import { getCookie, removeCookie } from "../member/Cookie";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MyPageDrop from "./MyPageDrop";

const Header = () => {
  const [login, setLogin] = useState(false);

  const MyCookie = getCookie("jwtToken");

  useEffect(() => {
    if (MyCookie != null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const loginHandle = () => {
    // 클릭시 로그인 페이지로 이동(비로그인의 경우)
    window.location.href = "/login";
  };

  /* 로그아웃 로직 작동 - 로컬 및 소셜 통합처리 */
  const logoutHandle = (event) => {
    const requestUrl = "http://localhost:9000/authenticate/logout";
    const requestMethod = "GET";
    console.log(MyCookie);
    if (window.confirm("로그아웃 하시겠습니까?")) {
      axios({
        method: requestMethod,
        url: requestUrl,
        headers: {
          Authorization: `Bearer ${MyCookie}`, // 쿠키 정보를 요청 헤더에 포함 -> 서버에서 검증
        },
      })
        .then((response) => {
          console.log("서버 응답 데이터:", response.data);
          removeCookie("jwtToken", { path: "/" });
          setLogin(false);
          const result = response.data.result;

          if (result !== "로그아웃 되었습니다.") {
            //소셜 로그아웃 - 소셜 로그아웃 콜백 url에 따라 판단
            console.log(response.data.result);
            const redirectUrl = result;
            window.location.href = redirectUrl; // 소셜 로그아웃 콜백 url로 이동
          } else if (result === "로그아웃 되었습니다.") {
            alert(result);
            window.location.reload();
          } else {
            alert("로그인이 만료되었습니다."); // 이미 쿠키가 만료된 경우
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
    }
  };
  const clickHandle = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div id="scroll_wrapper">
        <div id="container80">
          <div id="container_left">
            <div id="h_title">
              <h2 id="h_h2">
                <Link to="/" style={{ color: "white" }}>
                  GangChew
                </Link>
              </h2>
            </div>

            <ul id="list">
              <Link id="container33" to="/fundinglist">
                <li>펀딩list</li>
              </Link>
              <Link id="container33" to="/fundingcreate">
                <li>펀딩작성</li>
              </Link>
              <Link id="container33" to="/consumerlist">
                <li>요청list</li>
              </Link>
            </ul>
          </div>
          <div id="container_right">
            <div id="search">
              <SearchBar />
            </div>
            <div id="member">
              <div
                id="container33"
                onClick={login ? logoutHandle : loginHandle}
              >
                {login ? "로그아웃" : "로그인"}
              </div>
              <div id="container33">{login ? <MessageDrop /> : ""}</div>
              <div id="container33">{login ? <MyPageDrop /> : ""}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
