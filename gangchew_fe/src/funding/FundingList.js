import React, {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import PaginationRounded from "./PaginationRounded";
import SimpleSlider from "../component/SimpleSlider";
import fundingList from "../funding/css/fundingList.css";
import Card from "../component/Card";
import { useEffect } from 'react';
import axios from 'axios';

export default function FundingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(8);
  const [data, setData] = useState([]);

  useEffect(()=>{
    /*axios통신 들어갈 부분 => currentPage : 1
    axios.get('')
    .then((res)=>{
      
    })*/
    fetch('/ListTest.json')
    .then((res)=>res.json())
    .then((data)=>{

      const jsonData = data;
      console.log(jsonData);
      setData(jsonData.data);
    })
    .catch((error) => {
      console.error('데이터를 불러오는 중 오류 발생:', error);
    });
  },[])


  const handlePage =(event, page)=>{
    console.log(page)
    setCurrentPage(page);

    /*axios통신 들어갈 부분 => currentPage : 클릭한 값
    */
    
  }

  const prevhandlePage =(event, page)=>{
    console.log(page)
    if(currentPage === 1){
      return
    } else {
      setCurrentPage(currentPage - 1);
      /*axios통신 들어갈 부분
      */

    }
   
  }

  const nexthandlePage =(event, page)=>{
    console.log(page)
    if(currentPage === totalItems){
      return
    }else{
      setCurrentPage(currentPage + 1);
      /*axios통신 들어갈 부분
      */
    }
        
  }

  return (
    <div>
      <div id="headerarea"></div>
      <div id="container100">
        <div id="list_left"></div>
        <div id="list_center">
          <div id="carousel">
            <SimpleSlider />
          </div>
          <div id="category">
            <div id="category80">
              <div id="cate_item" className="cate_item_border_right">운동&Life</div>
              <div id="cate_item" className="cate_item_border_right">경제&금융</div>
              <div id="cate_item" className="cate_item_border_right">n잡&부업</div>
              <div id="cate_item" className="cate_item_border_right">커리어</div>
              <div id="cate_item" className="cate_item_border_right">언어</div>
              <div id="cate_item" className="cate_item_border_right">프로그래밍</div>
              <div id="cate_item">비즈니스&마케팅</div>
            </div>
          </div>
          
          <div id="options">
            <div id="title">
              <h2 id="p_h2">펀딩List</h2>
            </div>
            <div id="switch">
              <button>내지역/전체</button>
            </div>
            <div id="drop">
              <select>
                <option>-------</option>
                <option>달성률순</option>
                <option>최신순</option>
              </select>
            </div>
          </div>
          <div>
            <div id="content">
              <div id="contentBox">
                {data.map((funding) => (
                <span key={funding.num} id="cardBoard">
                  <Card funding={funding}/>
                </span>
                ))}
                </div>
            </div>
          </div>
          <div id="empty5"></div>
          <div id="pagination100">
            {/*------------페이지네이션 위치!!!!-----------*/}
            <Stack spacing={2}>
              <Pagination count={3} variant="outlined" shape="rounded" color="secondary" 
              page={currentPage} onChange={handlePage}/>
            </Stack>
          </div>
          <div id="empty5"></div>
        </div>
        <div id="list_right"></div>
      </div>
    </div>
  );
}
