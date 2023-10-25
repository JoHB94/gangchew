import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertInfo() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert sx={{ backgroundColor: 'rgba(128, 0, 128, 0.5)' }} severity="error">
        잠깐!
      </Alert>
    </Stack>
  );
}