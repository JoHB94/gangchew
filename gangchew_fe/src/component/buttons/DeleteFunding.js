import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {AiOutlineDelete} from 'react-icons/ai'

export default function DeleteFunding() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="outlined" color='secondary' size='large'>
      &nbsp;<h3>펀딩 취소하기 </h3>
        &nbsp;<AiOutlineDelete size={25}/>&nbsp;
        
        </Button>
      
    </Stack>
  );
}