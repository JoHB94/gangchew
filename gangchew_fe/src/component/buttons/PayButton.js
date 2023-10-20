import * as React from 'react';
import Button from '@mui/material/Button';

export default function PayButton() {
    
    const buttonStyle = {
        width: '100%', // 너비를 자동으로 설정
        height: '50px',
        backgroundColor: '#701edb', color:'#FFFFFF'
        
      };       
  
  
    return (
        <Button  style={buttonStyle} variant="contained">결제하기</Button>
      
    );
  }