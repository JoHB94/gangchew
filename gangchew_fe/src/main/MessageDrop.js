import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MessageBadge from '../component/MessageBadge';
import MessageDiv from './MessageDiv';

export default function MessageDrop() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="text" {...bindTrigger(popupState)}>
            <MessageBadge/>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} >
                <MessageDiv/>
            </MenuItem>
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
