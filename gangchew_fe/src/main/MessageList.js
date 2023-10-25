import React, { useState, useEffect } from 'react';
import MessageDiv from "./MessageDiv";
import searchList from "../main/css/searchList.css";
import { getCookie } from '../member/Cookie';
import axios from 'axios';

export default function MessageList(){

    const [msgList, setMsgList] = useState([]);
    const [msgCount, setMsgCount] = useState(0);

    let token = '';

  if (getCookie("jwtToken") !== undefined) {
    token = getCookie("jwtToken");
  }

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const cloudIP = ' http://138.2.114.150:9000/';
  const localIP = 'http://localhost:9000/';

  const reqServer = () => {
    axiosInstance.get(localIP + 'fundingmessage/all')
      .then((res) => {
        console.log(res);
        setMsgList(res.data.result);
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(()=>{
    reqServer();
  },[])


    return(
        <div>
           <div id="search_headerarea"></div>
            <div id="search_container">
                <div id="search_side"></div>
                <div id="search_center">
                    <div id="search_height150"></div>
                    <h1>쪽지 목록</h1><hr/>
                    <div id="search_funding">
                    <div id="search_height150"></div>
                        
                        <div>

                        {msgList&&msgList.map((msg,index) => (
                            
                                <div id="search_list"  key={index} >
                                    <MessageDiv messages={msg}/>
                                </div>
                            
                            ))}
                        
                        </div>
                        
                        <div id="search_height150"></div>
                    </div>
                    <div id="search_height150"></div>
                </div>
                
                <div id="search_side"></div>
            </div>
        </div>
    )
}
