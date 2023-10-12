import React , { useState, useEffect } from "react";
import axios from 'axios';

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

function SelectCategory({name,handleInputChange}) {
  const [category, setCategory] = useState('1');

  const handleChange = (event) => {
    const key = name;
    const newValue = event.target.value;
    setCategory(newValue);

    handleInputChange(key,newValue);
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='secondary'></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
          color='secondary'
          
        >
          <MenuItem value={1}>최신순</MenuItem>
          <MenuItem value={2}>조회순</MenuItem>
          <MenuItem value={3}>인기순</MenuItem>               
        </Select>
      </FormControl>
    </Box>
  );
}

const heartStyle = {
  color: 'red',
};

export default function ConsumerList(){  

    const [consumers, setConsumers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 consumers 를 초기화하고
          setError(null);
          setConsumers(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            'consumer/ConsumerList.json'
            //'https://www.gangchew.com/studentrequest/all'
          );
          setConsumers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) { 
          setError(e);
        }
        setLoading(false);
      };
  
      fetchUsers();
    }, []);    

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!consumers) return null;    

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
                      <div><SelectCategory/></div>
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
                          <div className="c_ListBtn2"/*좋아요수 */><FaHeart style={heartStyle} />{consumer.likecount}</div>
                          <div className="c_ListBtn3"/*댓글수 */><LiaCommentDots/>{consumer.commentcount}</div>
                      </div>
                  </div>
                  ))}
                  <div className="c_Pagination" /*페이지네이션*/></div>
                  <div className="c_BottomBlank" /*바텀빈공간 */></div>
              </div>
              <div className="c_Right" /**오른쪽빈공간 */></div>
          </div>         
        </div>
        
    )
}