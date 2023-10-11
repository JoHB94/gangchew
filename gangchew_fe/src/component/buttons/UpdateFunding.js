import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {FaTools} from 'react-icons/fa'

export default function UpdateFunding() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="outlined" style={{color :'#701edb'}} size='large'>
      <h3>펀딩 수정하기 </h3>
        &nbsp;<FaTools size={25}/>
        
        </Button>
      
    </Stack>
  );
}