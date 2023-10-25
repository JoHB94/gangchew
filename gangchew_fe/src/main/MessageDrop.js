import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MessageBadge from '../component/MessageBadge';
import MessageDiv from './MessageDiv';
import drop from '../main/css/drop.css';
import { useEffect } from 'react';
import { getCookie } from '../member/Cookie';
import { useState } from 'react';
import axios from 'axios';

export default function MessageDrop() {
  const [msgList, setMsgList] = useState([]);
  const [msgCount, setMsgCount] = useState(0);

  const [currentList, setCurrentList] = useState([]);

  const cloudIP = ' http://138.2.114.150:9000/';
  const localIP = 'http://localhost:9000/';

  const reqServer = () => {
    let token = '';

  if (getCookie("jwtToken") !== undefined) {
    token = getCookie("jwtToken");
  }

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axiosInstance.get(localIP + 'fundingmessage/all?state=SEND')
      .then((res) => {
        console.log(res);
        setMsgList(res.data.result);
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    if(msgList){
      setMsgCount(msgList.length);
    }
  }, [msgList]);

  useEffect(() => {
    reqServer();
  }, []);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="text" {...bindTrigger(popupState)}>
            <MessageBadge count={msgCount} />
          </Button>
          <Menu {...bindMenu(popupState)}>
            {msgList ? (
                 msgList.map((item, index) => (
                  msgCount ==0 ? (''):(
                    <MenuItem key={index} className='drop_menu' >
                    <MessageDiv messages={item} />
                  </MenuItem>
                  ) 
                  
                ))
            ):(
              <MenuItem>
                <div><b>메세지가 없습니다.</b></div>
              </MenuItem>
            )}    
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
