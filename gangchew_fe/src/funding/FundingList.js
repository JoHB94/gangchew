
import React, {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import SimpleSlider from "../component/SimpleSlider";
import fundingList from "../funding/css/fundingList.css";
import Card from "../component/Card";

import { useEffect } from 'react';
import axios from 'axios';
import SortSelect from './SortSelect';

export default function FundingList() {

//***********************************states*********************************************** */

  const defaultPage = 1;
  const defaultOrderby = 'newest';
  const defaultCategory = 0;
  const defaultItemsPerPage = 9;
  
  const [currentPage, setCurrentPage] = useState(defaultOrderby);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [orderby, setOrderby] = useState(defaultOrderby);
  const [category, setCategory] = useState(defaultCategory);
  const [data, setData] = useState([]);
  const [state,setState] = useState('');

  

//************************************ axios ************************************************** */
  /**default 요청 메소드 : 현재 페이지는 currentPage, category는 전체, orderby는 최신순 */
  const  reqServer=()=>{
    axios.post('http://localhost:9000/funding/all?items={}&category={}&orderby={}&state={}&currentpage={currentPage}')
    .then((res)=>{
      console.log("통신성공");
      setData(res);
      setState(res.state);
    }).catch((error)=>{
      console.log(error);
    })
  }




//**********************************callBack ************************************************** */
  //orderby 값을 받아옴.
const handleInputChange = (newValue) => {
    console.log(newValue);
    setOrderby(newValue);
    setCurrentPage(defaultPage);
    //reqServer();
  };



  
//**************************************onclick Handler**************************************** */

//카테고리 선택시 카테고리값 set, currentPage와 orderby기준 초가화 후 axios통신.
const selectCategory=(e)=>{
  const value = e.target.value;
  setCategory(value);
  setCurrentPage(defaultPage);
  setOrderby(defaultOrderby);
  //reqServer();

}

//******************************************page Handler************************************** */


const handlePage =(event, page)=>{
  console.log(page)
  setCurrentPage(page);

  // reqServer();
}

const prevhandlePage =(event, page)=>{
  console.log(page)
  if(currentPage === 1){
    return;
  } else {
    setCurrentPage(currentPage - 1);
    // reqServer();
  }
  
}

const nexthandlePage =(event, page)=>{
  console.log(page)
  if(currentPage === itemsPerPage){
    return;
  }else{
    setCurrentPage(currentPage + 1);
    // reqServer();
  }
      
}











//****************************************useEffect******************************************** */


  //페이지 렌더시 default정보를 불러오기 위한 useEffect
  useEffect(()=>{
    // reqServer();

    /**아래 fetch는 임시데이터인 json을 data배열에 담기 위한 코드 지워도 됩니다. */
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
              <div id="cate_item" className="cate_item_border_right">
                <input type='hidden' value={1}></input>
                운동&Life
              </div>
              <div id="cate_item" className="cate_item_border_right">
                <input type='hidden' value={1}></input>
                경제&금융
              </div>
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
              <SortSelect handleInputChange={handleInputChange}/>
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
