import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortSelect({handleInputChange}) {
  const [condition, setCondition] = useState('');

  const handleChange = (event) => {

    const newValue = event.target.value;
    setCondition(newValue);
    handleInputChange(newValue);
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='secondary'>sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={condition}
          label="sort"
          onChange={handleChange}
          color='secondary'
          
        >
          <MenuItem value={'newest'}>최신순</MenuItem>
          <MenuItem value={'deadline'}>마감임박</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
