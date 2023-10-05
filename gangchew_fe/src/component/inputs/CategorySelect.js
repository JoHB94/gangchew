import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategorySelect({name,handleInputChange}) {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    const key = name;
    const newValue = event.target.value;
    setCategory(newValue);

    handleInputChange(key,newValue);
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='secondary'>Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
          color='secondary'
          
        >
          <MenuItem value={1}>운동&Life</MenuItem>
          <MenuItem value={2}>경제&금융</MenuItem>
          <MenuItem value={3}>n잡&부업</MenuItem>
          <MenuItem value={4}>커리어</MenuItem>
          <MenuItem value={5}>언어</MenuItem>
          <MenuItem value={6}>프로그래밍</MenuItem>
          <MenuItem value={7}>비즈니스&마케팅</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
