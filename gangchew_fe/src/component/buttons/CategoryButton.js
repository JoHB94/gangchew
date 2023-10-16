import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CategoryButton({name}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button style={{color:"black", fontSize:"large", fontWeight:"600", width:"100%", height:"100%" }}>{name}</Button>
    </Stack>
  );
}