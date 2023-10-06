import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {AiFillHeart} from 'react-icons/ai';

export default function FullHeart() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="text" color="error">
        <AiFillHeart size={35}/>
      </Button>
    </Stack>
  );
}