import React , { useState, useEffect } from "react";
import axios from 'axios';

//페이지 네이션 import
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import '../consumer/css/ConsumerList.css';
import '../component/css/SimpleLine.css';

import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VscEye } from 'react-icons/vsc';
import { FaHeart } from 'react-icons/fa';
import { LiaCommentDots } from 'react-icons/lia';



function WriteButton() {
  const buttonStyle = {
    backgroundColor: '#701edb',
    color: 'white', // You can change the text color to your preference
  };   

  return (
    <Button variant="contained" startIcon={<CreateIcon />} style={buttonStyle}>
      글쓰기
    </Button>
  );
}


export default function ConsumerList(){  
//*****************************state********************************************* */
  const defaultItemsPerPage = 6;
  const defaultOrderby = 'newest';
  const defaultCurrentPage = 1;
  
  const [consumers, setConsumers] = useState([]);
  const [orderby, setOrderby] = useState(defaultOrderby);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage,setCurrentPage] = useState(defaultCurrentPage);




//************************************ axios ************************************************** */
  
  const  reqServer=()=>{
    axios.post('http://localhost:9000/')
    .then((res)=>{
      console.log("통신성공");
      setConsumers(res);
      setConsumers(res.state);
    }).catch((error)=>{
      console.log(error);
    })
  }

/*************************************useEffect********************************* */
//페이지가 렌더될 때 실행될 함수.
useEffect(()=>{
  // reqServer();
},[])






//******************************************page Handler************************************** */


const handlePage =(event, page)=>{
  console.log(page)
  setCurrentPage(page);

  // reqServer();
}



const handleChange = (event) => {
  const newValue = event.target.value;
  console.log(newValue);
  setOrderby(newValue);
  setCurrentPage(defaultCurrentPage);
  //reqServer();
};
        

    return (
        <div>
          <div className="c_HeaderBlank" /**헤더 */></div>
          <div className="c_Container">
              <div className="c_Left" /**왼쪽빈공간 */></div>
              <div className="c_Center">
                  <div>
                      <h2>수요자 게시판</h2>     
                      <div className="SimpleLine"></div>         
                  </div>
                  <div className="c_BtnBox">
                      <div ><WriteButton/></div>
                      <div className="c_Mid"></div>
                      <div>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" color='secondary'>sort</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="1"
                            label="Category"
                            onChange={handleChange}
                            color='secondary'
                            
                          >
                            <MenuItem value={1}>최신순</MenuItem> 
                            <MenuItem value={2}>인기순</MenuItem>               
                          </Select>
                        </FormControl>
                      </Box>

                      </div>
                  </div>
                  {consumers.map(consumer => (
                  <div className="c_ListBox">
                      <div className="c_ListRowTop">
                          <div className="c_ListName_1"/*작성자*/>{consumer.writer}</div>
                          <div className="c_ListName_2"/*작성일자*/>작성일자</div>
                          <div className="c_ListName_3"/*카테고리명*/>{consumer.categoryId}</div>
                          <div className="c_ListNameBlank"/*빈공간 */></div>
                      </div>   
                      <div className="C_ListRowBottom">
                          <div className="c_ListTitle"/*제목 */>{consumer.title}</div>
                          <div className="c_ListBlank"/*빈공간 */></div>
                          <div className="c_ListBtn1"/*조회수 */><VscEye/>{consumer.viewcount}</div>
                          <div className="c_ListBtn2"/*좋아요수 */><FaHeart style={{color:"red"}} />{consumer.likecount}</div>
                          <div className="c_ListBtn3"/*댓글수 */><LiaCommentDots/>{consumer.commentcount}</div>
                      </div>
                  </div>
                  ))}
                  <div className="c_Pagination" /*페이지네이션*/>
                    <Stack spacing={2}>
                      <Pagination count={3} variant="outlined" shape="rounded" color="secondary" 
                      page={currentPage} onChange={handlePage}/>
                    </Stack>
                  </div>
                  <div className="c_BottomBlank" /*바텀빈공간 */></div>
              </div>
              <div className="c_Right" /**오른쪽빈공간 */></div>
          </div>
                   
        </div>
        
    )
}