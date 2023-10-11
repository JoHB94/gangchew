import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {AiOutlineHeart} from 'react-icons/ai';

export default function EmptyHeart() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="text" color="error">
        <AiOutlineHeart size={35} />
      </Button>
    </Stack>
  );
}