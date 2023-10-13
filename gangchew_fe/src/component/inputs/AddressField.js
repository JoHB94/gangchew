import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddressButton from '../buttons/AdressButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/**
 * 이 컴포넌트는 텍스트의 인풋을 받는 공용 컴포넌트입니다.
 * size(float) : input창의 크기입니다.
 * text(String) : 플레이스 홀더입니다.
 * name(String) : 객체로 담아야 할 경우, 객체의 key값 부분입니다.
 * handleInputChange(func): 콜백함수 입니다. => 부모 컴포넌트에서 콜백함수 설정해야 함.
 * @param {*} param0 
 * @returns 
 */

export default function AddressField({modValue}) { 

  const [childInputValue, setChildInputValue] = useState('');
  useEffect(()=>{
    setChildInputValue(modValue)
  },[])
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0, width: 55 +'ch' }
      }}
      noValidate
      autoComplete="off"

      
    >
      <TextField color="secondary" id="outlined-basic" variant="outlined" placeholder='버튼을 눌러주세요'
      value={childInputValue}  fullWidth
      />
    </Box>
  );
}