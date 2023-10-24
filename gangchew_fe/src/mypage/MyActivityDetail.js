<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../consumer/css/MyActivityDetail.css";
import "../component/css/SimpleLine.css";
import { FaLongArrowAltDown } from "react-icons/fa";
import LongCard from "../component/LongCard";
import ListBox from "../component/ListBox";
import axios from "axios";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import { getCookie } from "../member/Cookie";
import MyactivityListBox from "./mypageComponent/MyactivityListBox";
import MyFundingListBox from "./mypageComponent/MyFundingListBox";
import MyLikePostListBox from "./mypageComponent/MyLikePostListBox";
import MyPostListBox from "./mypageComponent/MyPostListBox";
import MyRefundListBox from "./mypageComponent/MyRefundListBox";
=======
import React from "react";

import '../consumer/css/MyActivityDetail.css';
import '../component/css/SimpleLine.css';
import { FaLongArrowAltDown } from "react-icons/fa";
import LongCard from "../component/LongCard";
import ListBox from "../component/ListBox"
import { getCookie } from "../member/Cookie";
>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681

export default function MyActivityDetail() {
  const [myUsername, setMyUsername] = useState("");
  const [myUserNickname, setMyUserNickname] = useState("");
  const [postData, setPostData] = useState("");

<<<<<<< HEAD
  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  /* 유저 인포 확인 */
  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios({
          url: `${LOCAL_IP}/user/myinfo`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("받은 유저 정보 데이터: ", response.data.result);
        setMyUsername(response.data.result.username);
        setMyUserNickname(response.data.result.nickname);
        console.log(myUsername);
        
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    requestData();
  }, [myUsername]);
  
  return (
=======
export default function MyActivityDetail(){


    return (
>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681
    <div>
      <div className="m_HeaderBlank" /**헤더 */></div>
      <div className="m_ContainerDetail">
        <div className="m_LeftDetail" /**왼쪽빈공간 */></div>

        <div className="m_CenterDetail">
          <div>
            <h2>나의 활동 내역</h2>
            <div className="SimpleLine"></div>
            <h3>펀딩 참여 내역</h3>
            <MyactivityListBox myUsername={myUsername} myUserNickname={myUserNickname}/>{/* 확인 */}
            {/* <div className="m_FundingBox">
                    <div>
                        <div className="m_LongCard" /**<LongCard/> */>
                           
                        </div >
                        <div className="m_LongCard" /**<LongCard/> */>
                            
                        </div>
                        <div className="m_LongCard" /**<LongCard/> */>
                            
                        </div>
                    </div>
                    <div className="m_Pagination1"></div>
               </div> */}
            <div className="m_BoardList">
            </div>
            <h3>내가 작성한 요청 게시글</h3>
            <div className="m_BoardList">
              <MyPostListBox myUsername={myUsername} myUserNickname={myUserNickname}/>{/* 확인 */}
            </div>
            <h3>내가 작성한 펀딩 내역</h3>
            <div className="m_BoardList">
              <MyFundingListBox myUsername={myUsername} myUserNickname={myUserNickname}/>{/* 확인 */}
            </div>
            <h3>좋아요 누른 게시물 내역</h3>
            <div className="m_BoardList">
              <MyLikePostListBox myUsername={myUsername} myUserNickname={myUserNickname}/>
            </div>
            <h3>취소 / 환불 내역</h3>
            <div className="m_BoardList">
              <MyRefundListBox myUsername={myUsername} myUserNickname={myUserNickname}/>
            </div>
            <div className="m_BottomBlank" /*바텀빈공간 */></div>
          </div>
        </div>
      </div>
      <div className="m_RightDetail" /**오른쪽빈공간 */></div>
    </div>
  );
};
