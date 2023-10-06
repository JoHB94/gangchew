import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {FaCircleChevronRight} from 'react-icons/fa6';

export default function DoFunding() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" size='large' style={{backgroundColor: '#701edb', color:'#FFFFFF'}}>
        <h2>펀딩 참여하기</h2>
        &nbsp;<FaCircleChevronRight size={35}/>
        </Button>
      
    </Stack>
  );
}