
import React, {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import SimpleSlider from "../component/SimpleSlider";
import fundingList from "../funding/css/fundingList.css";
import Card from "../component/Card";

import { useEffect } from 'react';
import axios from 'axios';
import SortSelect from './SortSelect';
import CategoryButton from '../component/buttons/CategoryButton';
import { getCookie } from '../member/Cookie';
import Progress from '../component/Progress';

export default function FundingList() {

//***********************************states*********************************************** */

  const defaultPage = 1;
  const defaultOrderby = 'newest';
  const defaultCategory = 0;
  const defaultItemsPerPage = 9;
  const categories = [
    { id: 0, name: '전체'},
    { id: 1, name: '운동&Life'},
    { id: 2, name: '경제&금융'},
    { id: 3, name: 'n잡&부업'},
    { id: 4, name: '커리어'},
    { id: 5, name: '언어'},
    { id: 6, name: '프로그래밍'},
    { id: 7, name: '비즈니스&마케팅'}
  ];
  const [data, setData] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [orderby, setOrderby] = useState(defaultOrderby);
  const [currentCategory, setCurrentCategory] = useState(defaultCategory);
  const [state,setState] = useState('');
  
  const count = Math.ceil(totalItems/itemsPerPage);

//************************************ axios ************************************************** */
  /**default 요청 메소드 : 현재 페이지는 currentPage, category는 전체, orderby는 최신순 */
  const cloudIP = ' http://138.2.114.150:9000/';
  const localIP = 'http://localhost:9000/';
  const URI = `funding/all?itemsPerPage=${itemsPerPage}&category=${currentCategory}&orderby=${orderby}&currentpage=${currentPage}`;
  
  const token = '';

    if (getCookie("jwtToken") === !undefined){
        token = getCookie("jwtToken");
    }

  const axiosInstance = axios.create({
    headers:{
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const  reqServer=()=>{
    console.log(URI);
    
    axiosInstance
    .get(localIP + URI)
    .then((res)=>{
      setData(res.data.result);
      // setState(res.data.result.state);
      setTotalItems(res.data.result[0].totalItems);
      // setIsLoading(!isLoading);
      console.log(res);
    }).catch((error)=>{
      console.log("통신 실패"+error);
    })
  }
//*********************************set********************************************** */
useEffect(() => {
  reqServer();
}, [currentPage, currentCategory, orderby, itemsPerPage]);

useEffect(()=>{
  
},[data])

//**********************************callBack ************************************************** */
  //orderby 값을 받아옴.
const handleInputChange = (newValue) => {
    console.log(newValue);
    setOrderby(newValue);
    setCurrentPage(defaultPage);

    // reqServer();
  };

  // useEffect(()=>{
  //   reqServer();
  // },[orderby])

  
//**************************************onclick Handler**************************************** */

//카테고리 선택시 카테고리값 set, currentPage와 orderby기준 초가화 후 axios통신.
const selectCategory=(e)=>{
  const id = e;
  console.log("카테고리 아이디: " + id);
  setCurrentCategory(id);
  setCurrentPage(defaultPage);
  setOrderby(defaultOrderby);

  // reqServer();
  
}

// useEffect(()=>{
//   reqServer();
// },[currentCategory])

//******************************************page Handler************************************** */

const handlePage =(event, page)=>{
  console.log(page)
  setCurrentPage(page);

  // reqServer();
}

// useEffect(()=>{
//   reqServer();
// },[currentPage])


//****************************************useEffect******************************************** */


  //페이지 렌더시 default정보를 불러오기 위한 useEffect
  useEffect(()=>{

    
    console.log(token);
    
    reqServer();
    
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
              {categories.map((category,index) => (
                <div 
                id="cate_item" 
                className={index === categories.length - 1 ? "" : "cate_item_border_right"}
                // category-id={category.id} 
                onClick={()=> selectCategory(index)}
                key={category.id}
                style={{
                  color: currentCategory === index ? '#701edb' : 'black',
                  marginBottom: currentCategory === index? '0px' : '10px'
                }}
                >
                  {category.name}
                </div> 
              ))}
            </div>
          </div>

          <div id="options">
            <div id="list_title">
              <h2 id="p_h2">펀딩List</h2>
            </div>
            <div id="switch">
              
            </div>
            <div id="drop">
              <SortSelect handleInputChange={handleInputChange}/>
            </div>
          </div>
          <div>
            <div>
            
            <div id="contentBox">
              {data && data.length > 0 && data.map((data) => (
              <span key={data.fundingId} id="cardBoard">
                <Card funding={data}/>
              </span>
              ))}
              </div>
              
            </div>

          </div>
          <div id="empty5"></div>
          <div id="pagination100">
            {/*------------페이지네이션 위치!!!!-----------*/}

            <Stack spacing={2}>
              <Pagination count={count} variant="outlined" shape="rounded" color="secondary" 
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
