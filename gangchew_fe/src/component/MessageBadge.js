import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function MessageBadge({count}) {
  return (
    <Badge badgeContent={count} color="error" >
      <MailIcon color="action" style={{color:'white'}}/>
    </Badge>
  );
}