import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

/**
 * 이 컴포넌트는 텍스트의 인풋을 받는 공용 컴포넌트입니다.
 * size(float) : input창의 크기입니다.
 * text(String) : 플레이스 홀더입니다.
 * name(String) : 객체로 담아야 할 경우, 객체의 key값 부분입니다.
 * handleInputChange(func): 콜백함수 입니다. => 부모 컴포넌트에서 콜백함수 설정해야 함.
 * @param {*} param0 
 * @returns 
 */

export default function CommentBox({ handleInputChange }) { // 매개변수를 객체로 변경

    const [childInputValue, setChildInputValue] = useState('');
   
  
    const handleChange = (event) => {
      
      const newValue = event.target.value;
      setChildInputValue(newValue);
      
      // 입력 값이 변경될 때 콜백 함수 호출하여 부모 컴포넌트로 전달
      handleInputChange(newValue);
    };
  
    return (
      <Box
        component="form"
        sx={{
          
        }}
        noValidate
        autoComplete="off"
  
        
      >
        <TextField color="secondary" id="outlined-basic"  variant="outlined" 
        value={childInputValue} onChange={handleChange} fullWidth
        multiline />
      </Box>
    );
  }
 
  
  
  
  
  
  