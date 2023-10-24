import React, { useState, useEffect } from "react";
import { getCookie } from "../../member/Cookie";
import axios from "axios";
//페이지 네이션 import
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../../component/css/SimpleLine.css";

import { Link } from "react-router-dom";

export default function MyLikePostListBox(props) {
  //*****************************state********************************************* */

  /* 전체 데이터를 기반으로 프론트엔드 자체적으로 페이지네이션을 구현하였음 */
  const PostPerpage = 3; // 한 페이지에 들어가는 게시물 수
  const [currentPage, setCurrentPage] = useState(1); // 초기 페이지 1로 설정
  const indexOfLastPost = currentPage * PostPerpage; // 한페이지에 들어가는 게시물의 인덱스
  const indexOfFirstPost = indexOfLastPost - PostPerpage; // 페이지당 첫 게시물의 인덱스번호

  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const myArray = [];

  const [consumers, setConsumers] = useState([]);
  const [history, setHistory] = useState(false);

  const currentPosts = consumers.slice(indexOfFirstPost, indexOfLastPost); // 현재 게시물의 단위를 나누는 로직(1->3 ~ 4->6 ~ 7->9 ...)

  //************************************ axios ************************************************** */
  useEffect(() => {
  const requestData = async () => {
    try {
      const response = await axios({
        url: `${LOCAL_IP}/mylike`,
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      console.log("받은 데이터: ", response.data); //Array개수 확인
      if(response.data.result.length == 0) {
        setHistory(true); //데이터 X 상태
      }else {
        setHistory(false);
      }
      
      for (let i = 0; i < response.data.result.length; i++) {
          myArray.push(response.data.result[i]);
          setConsumers(myArray);
      }


    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  requestData();
  }, [props.myUsername]);
  /*************************************useEffect********************************* */
  //페이지가 렌더될 때 실행될 함수.

  //******************************************page Handler************************************** */
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  
  const ListBoxStyle = {
    width: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    height: "auto",
    borderRadius: "10px",
    border: "solid 1px #d3d3d3",
  };

  const List_Map_Style = {};

  const blankBoardStyle = {
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #d3d3d3",
  }

  const List_Box_1Style = {
    display: "flex",
    marginBottom: "20px",
  };



  return (
    <div style={ListBoxStyle} /**전체 컨테이너 */>
      {history ? <div className="blankboard" style={blankBoardStyle}>게시글이 없습니다.</div> : 
      <>
      {currentPosts.map((item) => (
      <div className="List_Map" key={item.postId} style={List_Map_Style}>
        <div className="List_Box_1" style={List_Box_1Style}>
          <div style={{ flex: 1 }} className="List_PostNumber" /* 카테고리(구분) */>
            {item.type === "STUDENT_REQUEST" ? "좋아요 누른 글" : "좋아요 누른 펀딩"}
          </div>
          <div style={{ flex: 1 }} className="List_Writer" /* 작성자 */>
          {props.myUserNickname}
          </div>
          <div style={{ flex: 1 }} className="List_RegDt" /* 조회수 */>
            조회수 {item.viewCount}
          </div>
        </div>
        <div className="List_Title" /**제목 영역 */>
          <Link to={`/consumerdetail/${item.postId}`}>
          {item.title}
          </Link>
        </div>
        <div className="SimpleLine" /**라인 */></div>
      </div>
      ))}
      </>
      }
      <div className="c_Pagination" /*페이지네이션*/>
        <Stack spacing={10}>
          <Pagination
            count={Math.ceil(consumers.length / PostPerpage)} // 전체 게시물 수
            variant="outlined"
            shape="rounded"
            color="secondary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
}
