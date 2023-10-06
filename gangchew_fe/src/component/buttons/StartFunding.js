import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {AiFillWarning} from 'react-icons/ai'

export default function StartFunding() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="outlined" color='secondary' size='large'>
      &nbsp;<h3>펀딩 시작하기 </h3>
        &nbsp;<AiFillWarning size={25}/>&nbsp;
        
        </Button>
      
    </Stack>
  );
}