import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {MdCancel} from 'react-icons/md';



export default function CancelFunding() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" size='large' style={{backgroundColor: '#000', color:'#FFFFFF'}}>
        <h3>펀딩 취소하기</h3>
        &nbsp;<MdCancel size={35}/>
        </Button>
      
    </Stack>
  );
}