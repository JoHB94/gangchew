import * as React from 'react';
import header from '../main/css/header.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import MessageBadge from '../component/MessageBadge';
import {CgProfile} from 'react-icons/cg';
import {BiSearch} from 'react-icons/bi';
import SearchBar from '../component/inputs/SearchBar';
import MessageDrop from './MessageDrop';
import axios from "axios";
import { getCookie, removeCookie } from "../member/Cookie";
import { Link } from "react-router-dom";

const Header =()=> {

    const [login, setLogin] = useState(false);

    if (window.location.pathname === '/login' || 
    window.location.pathname === '/selectRegistration' ||
    window.location.pathname === '/registration') 
    return null;
    
    const logoutHandle = (event) => {
      const requestUrl = "http://138.2.114.150:9000/authenticate/logout";
      const requestMethod = "POST";
      const MyCookie = getCookie("jwtToken");
      console.log(MyCookie);
      if(window.confirm("로그아웃 하시겠습니까?")) {
      axios({
        method: requestMethod,
        url: requestUrl,
        headers: {
          Authorization: `Bearer ${MyCookie}`, // 쿠키 정보를 요청 헤더에 포함
        },
      })
        .then((response) => {
          console.log("서버 응답 데이터:", response.data);
  
          if (MyCookie != null) {
            removeCookie("jwtToken"); // 쿠키 브라우저에서 삭제
            window.location.href = "/main";
          } else {
            alert("로그인 시간이 만료되었습니다."); // 이미 쿠키가 만료된 경우
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
      };
    };

    return (
        <div>
            <div id ="scroll_wrapper">
                <div id='container80'>
                    <div id='container_left'>
                        <div id='h_title'>
                            <h2 id='h_h2'>GangChew</h2>
                        </div>
                        
                        <ul id='list'>
                            <li id='container33'>펀딩list</li>
                            <li id='container33'>펀딩작성</li>
                            <li id='container33'>요청list</li>
                        </ul>
                        
                    </div>
                    <div id='container_right'>
                        <div id='search'>                      
                            <SearchBar/>
                        </div>
                        <div id='member'>
                            <div id='container33'>
                                {login?('로그아웃'):('로그인')}
                            </div>
                            <div id='container33'>
                                <MessageDrop/>
                            </div>
                            <div id='container33'>
                                <CgProfile size={32}/>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
    </div>
  );
};
export default Header;
