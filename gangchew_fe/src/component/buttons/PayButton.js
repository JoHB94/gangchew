import * as React from 'react';
import Button from '@mui/material/Button';

export default function PayButton({ onClick }) {
    
    const buttonStyle = {
        width: '100%', // Automatically set the width
        height: '50px',
        backgroundColor: '#701edb',
        color: '#FFFFFF'
    };       

    return (
        <Button style={buttonStyle} variant="contained" onClick={onClick}>결제하기</Button>
    );
}