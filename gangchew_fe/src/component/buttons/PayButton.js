import * as React from 'react';
import Button from '@mui/material/Button';

export default function PayButton( props ) {
    
    const buttonStyle = {
        width: '100%', // Automatically set the width
        height: '50px',
        backgroundColor: '#FFF',
        borderColor: '#701edb',
        color: '#701edb'
    };       

    return (
        <Button style={buttonStyle} variant="outlined">모두 제거</Button>
    );
}