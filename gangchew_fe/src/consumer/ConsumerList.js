import React , { useState, useEffect } from "react";
import axios from 'axios';

//페이지 네이션 import
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import '../consumer/css/ConsumerList.css';
import '../component/css/SimpleLine.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VscEye } from 'react-icons/vsc';
import { FaHeart } from 'react-icons/fa';
import { LiaCommentDots } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom'
import { getCookie } from "../member/Cookie";
import WriteButton from "../component/WriteButton";



export default function ConsumerList(){  
//*****************************state********************************************* */
  const defaultItemsPerPage = 6;
  const defaultOrderby = 'newPosts';
  const defaultCurrentPage = 1;

  const [consumers, setConsumers] = useState([]);
  const [orderby, setOrderby] = useState(defaultOrderby);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage,setCurrentPage] = useState(defaultCurrentPage);
  //페이지네이션 count 수
  const [totalItems, setTotalItems] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  



//************************************ axios ************************************************** */
const cloudIP = ' http://138.2.114.150:9000/';
const localIP = 'http://localhost:9000/';




  const  reqServer=()=>{
    let token = '';
      if (getCookie("jwtToken") !== undefined){
        token = getCookie("jwtToken");
        
    }
    
    let axiosInstance = axios.create({
        headers:{
          'Content-Type': 'application/json',
        }
      });
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosInstance.get(localIP+`studentrequest/all?orderby=${orderby}&postsPerPage=6&currentpage=${currentPage}`)
    .then((res)=>{
      console.log("통신성공 {}",res);
      console.log("URI: " + `studentrequest/all?orderby=${orderby}&postsPerPage=6&currentpage=${currentPage}`)
      setConsumers(res.data.result);
      setTotalItems(res.data.result[0].totalItems);
      console.log("orderby {}",orderby);
    }).catch((error)=>{ 
      console.log(error);
    })

    // // json test
    // axios.get(
    //   'consumer/ConsumerList.json'
    // )
    // .then((response)=>{
    //   setConsumers(response.data); // 데이터는 response.data 안에 들어있습니다.
    // })
    // .catch((error)=>{
    //   console.log(error)
    // });
    

  }

/*************************************useEffect********************************* */
//페이지가 렌더될 때 실행될 함수.
useEffect(()=>{
  reqServer();
},[])

useEffect(()=>{
  setCount(Math.ceil(totalItems/itemsPerPage));
  
},[totalItems])




//******************************************page Handler************************************** */


const handlePage =(event, page)=>{
  console.log(page)
  setCurrentPage(page);
}

useEffect(()=>{
  reqServer();
  console.log('통신')
},[currentPage])


//*******************************정렬값에 의해 통신하는 함수 ************************************* */
const handleChange = (event) => {
  const newValue = event.target.value;
  console.log(newValue);
  setOrderby(newValue);
  setCurrentPage(defaultCurrentPage);
};

useEffect(()=>{
  reqServer();
},[orderby])

const moveToWrite = () => {
  if (getCookie("jwtToken")) {
    navigate('/consumercreate');
  } else {
    navigate('/login'); // 사용자가 로그인하지 않은 경우 로그인 페이지로 이동
  }
};

const handleLike = (id) => {

  console.log('like {id}',id);

  let token = '';

    if (getCookie("jwtToken") === !undefined){
        token = getCookie("jwtToken");
    }

  let axiosInstance = axios.create({
    headers:{
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


  axiosInstance.get(localIP+`studentrequest/likeclick?id=${id}`)
  .then((res)=>{
    console.log("통신성공 {}",res);
    alert(res.data.message);
    // 하트 표시/미표시
  }).catch((error)=>{ 
    console.log(error);
  })


//<div className="c_ListListBtn3"/*댓글수 */><LiaCommentDots/>{consumer.commentcount}</div>  

}
        

    return (
        <div>
          <div className="c_ListHeaderBlank" /**헤더 */></div>
          <div className="c_ListContainer">
              <div className="c_ListLeft" /**왼쪽빈공간 */></div>
              <div className="c_ListCenter">
                  <div>
                      <h2>수요자 게시판</h2>     
                      <div className="SimpleLine"></div>         
                  </div>
                  <div className="c_ListBtnBox">
                  <div className="c_ListWrite"><WriteButton onClick={moveToWrite} /></div>
                      <div className="c_ListMid"></div>
                      <div>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" color='secondary'>sort</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderby}
                            label="Category"
                            onChange={handleChange}
                            color='secondary'
                            
                          >
                            <MenuItem value={'newPosts'}>최신순</MenuItem> 
                            <MenuItem value={'mostLike'}>인기순</MenuItem>               
                          </Select>
                        </FormControl>
                      </Box>

                      </div>
                  </div>
                  {consumers&&consumers.map(consumer => (
                  <div className="c_ListListBox" key={consumer.id}>
                      <div className="c_ListListRowTop">
                          <div className="c_ListListPostNumber"/**글번호 */>{consumer.id}</div>
                          <div className="c_ListListName_1"/*작성자*/>{consumer.writer}</div>
                          <div className="c_ListListName_2"/*작성일자*/>{consumer.regDt}</div>
                          <div className="c_ListListName_3"/*카테고리명*/>{consumer.categoryId}</div>                          
                          <div className="c_ListListNameBlank"/*빈공간 */></div>
                      </div>   
                      <div className="C_ListListRowBottom">
                        {console.log(consumer.id)}
                          <div className="c_ListListTitle"/*제목 */><Link to={`/consumerdetail/${consumer.id}`}>{ consumer.title }</Link></div>
                          <div className="c_ListListBlank"/*빈공간 */></div>
                          <div className="c_ListListBtnBox">
                            <div className="c_ListListBtn1"/*조회수 */><VscEye/>{consumer.viewCount}</div>
                            <div className="c_ListListBtn2"/*좋아요수 */><FaHeart />{consumer.likeCount}</div>
                          </div>
                      </div>
                  </div>
                  ))}
                  <div className="c_ListPagination" /*페이지네이션*/>
                    <Stack spacing={2}>
                      <Pagination count={count} variant="outlined" shape="rounded" color="secondary"    
                      page={currentPage} onChange={handlePage}/>
                    </Stack>
                  </div>
                  <div className="c_ListBottomBlank" /*바텀빈공간 */></div>
              </div>
              <div className="c_ListRight" /**오른쪽빈공간 */></div>
          </div>
                   
        </div>
        
    )
}