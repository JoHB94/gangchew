import React, { useState, useEffect } from "react";
import axios from "axios";
//페이지 네이션 import
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../component/css/SimpleLine.css";

<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link } from 'react-router-dom';
import { getCookie } from "../member/Cookie";
>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681

export default function ListBox() {
  //*****************************state********************************************* */
  const defaultItemsPerPage = 3;
  const defaultOrderby = "newest";
  const defaultCurrentPage = 1;

  const [consumers, setConsumers] = useState([]);
  const [orderby, setOrderby] = useState(defaultOrderby);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  //************************************ axios ************************************************** */

<<<<<<< HEAD
  const reqServer = () => {
    axios
      .get(
        "consumer/ConsumerList.json"
        //'https://www.gangchew.com/studentrequest/all'
      )
      .then((response) => {
        setConsumers(response.data); // 데이터는 response.data 안에 들어있습니다.
      })
      .catch((error) => {
        console.log(error);
      });
  };

=======
  const cloudIP = 'http://138.2.114.150:9000';
  const localIP = 'http://localhost:9000';

  const token = '';

  if (getCookie("jwtToken") === !undefined){
      token = getCookie("jwtToken");
      console.log(token);
  }

  const axiosInstance = axios.create({
      headers:{
        'Content-Type': 'application/json',
      }
    });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const  reqServer=()=>{
    axiosInstance.get(localIP+'studentrequest/all')
    .then((res)=>{
      console.log("통신성공 {}",res);
      setConsumers(res);
      //setConsumers(res.state);
    }).catch((error)=>{ 
      console.log(error);
    })
  }
  
>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681
  /*************************************useEffect********************************* */
  //페이지가 렌더될 때 실행될 함수.
  useEffect(() => {
    reqServer();
  }, []);

  //******************************************page Handler************************************** */
  const handlePage = (event, page) => {
    console.log(page);
    setCurrentPage(page);
<<<<<<< HEAD

    // reqServer();
  };

=======
    reqServer();
  } 
  
>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681
  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    setOrderby(newValue);
    setCurrentPage(defaultCurrentPage);
<<<<<<< HEAD
    //reqServer();
=======

  };  
  const ListBoxStyle ={
    width: 'auto',
    marginTop: '20px',
    marginBottom: '20px',
    padding: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
    height: 'auto',        
    borderRadius: '10px',    
    border: 'solid 1px #d3d3d3',

>>>>>>> 141bbb26011dda58fe81547aeee95673a2ac0681
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

  const List_Map_Style = {
  }

  const List_Box_1Style = {
    display: "flex",
    marginBottom: "20px",
  };

  return (
    <div style={ListBoxStyle} /**전체 컨테이너 */>
      {consumers.map((consumer) => (
        <div className="List_Map" key={consumer.postId} style={List_Map_Style}>
          <div className="List_Box_1" style={List_Box_1Style}>
            <div style={{ flex: 1 }} className="List_PostNumber" /**글번호 */>
              {consumer.postId}글번호
            </div>
            <div style={{ flex: 1 }} className="List_Writer" /*작성자*/>
              {consumer.writer}
            </div>
            <div style={{ flex: 1 }} className="List_RegDt" /*작성일자*/>
              {consumer.regDt}
            </div>
          </div>
          <div className="List_Title" /**제목 영역 */>
            <Link to={`/consumerdetail/${consumer.postId}`}>
              {consumer.title}
            </Link>
          </div>
          <div className="SimpleLine" /**라인 */></div>
        </div>
      ))}
      <div className="c_Pagination" /*페이지네이션*/>
        <Stack spacing={2}>
          <Pagination
            count={3}
            variant="outlined"
            shape="rounded"
            color="secondary"
            page={currentPage}
            onChange={handlePage}
          />
        </Stack>
      </div>
    </div>
  );
}
