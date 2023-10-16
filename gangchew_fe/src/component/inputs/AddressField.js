import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddressButton from '../buttons/AdressButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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