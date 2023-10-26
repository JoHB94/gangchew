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

export default function ConsumerTitleTextFields({ size, text, name, handleInputChange, modValue, multiline }) {

    const [childInputValue, setChildInputValue] = useState(modValue);
    const [error, setError] = useState(false);
  
    const handleChange = (event) => {
      const key = name;
      const newValue = event.target.value;
     

      setChildInputValue(newValue);
  
      // 입력 값이 변경될 때 콜백 함수 호출하여 부모 컴포넌트로 전달
      handleInputChange(key, newValue);
  
      // 유효성 검사 - 제목이 20글자를 넘지 않도록 및 필수 입력 유효성 검사
      if(newValue==null || newValue=='undefined') {

      } else if (newValue.length > 100) {
        setError(true);
        console.error('제목은 100글자를 넘을 수 없습니다.');
      } else if (newValue.trim().length === 0) {
        setError(true);
        console.error('제목은 필수입니다.');
      } else {
        setError(false);
      }
    };
  
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0, width: size + 'ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          color="secondary"
          id="outlined-basic"
          label={text}
          variant="outlined"
          value={childInputValue}
          onChange={handleChange}
          fullWidth
          multiline={multiline}
          error={error}
          helperText={error ? (childInputValue.trim().length === 0 ? '제목은 필수입니다' : '제목은 100글자를 넘을 수 없습니다') : ''}
        />
      </Box>
    );
  }