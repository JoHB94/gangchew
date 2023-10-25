import React from 'react';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

function WriteButton({ onClick }) {
  const buttonStyle = {
    backgroundColor: '#701edb',
    color: 'white',
    width : '100px',
   
    
  };

  return (
    <Button variant="contained" startIcon={<CreateIcon />} style={buttonStyle} onClick={onClick}>
      글쓰기
    </Button>
  );
}

export default WriteButton;