import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";

export default function EditButton() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const handleClick = () => {
    navigate(`/consumerupdate/${postId}`);
  };

  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        style={{ backgroundColor: '#701edb', color: '#FFFFFF' }}
        onClick={handleClick}
      >
        수정
      </Button>
    </Stack>
  );
}