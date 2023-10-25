import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import messageDiv from '../main/css/messageDiv.css';
import {FcCancel} from 'react-icons/fc';
import OkButton from '../component/buttons/OkButton';
import { getCookie } from '../member/Cookie';
import axios from 'axios';

export default function MessageDiv({messages}){


    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [msgs,setMsgs] = useState({

    });
    const [fundung, setFunding] = useState({});
    const [title,setTitle] = useState('');
    const [fundingId, setFundingId] =useState('');

    useEffect(()=>{
        if (messages) {
            console.log(messages);
            setMsgs(messages);
            if (messages.funding) {
                // console.log(messages.funding);
              setFunding(messages.funding);
              setTitle(messages.funding.title);
              setFundingId(messages.funding.id);
            }
          }
    },[])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: "rgb(236, 236, 236)",
        boxShadow: 24,
        p: 4,
      };

      const cloudIP = ' http://138.2.114.150:9000/';
      const localIP = 'http://localhost:9000/';
  

    const reqChecked=()=>{
        let token = '';
  
        if (getCookie("jwtToken") !== undefined){
            token = getCookie("jwtToken");
        }
    
        const axiosInstance = axios.create({
            headers:{
            'Content-Type': 'application/json',
            }
        });
    
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.get(localIP + `fundingmessage/update?funding_id=${fundingId}&forward_state=CHECKED`)
        .then((res)=>{
            console.log(`fundingmessage/update?funding_id=${fundingId}&forward_state=CHECKED`)
            console.log(res);
            if(res.data.result ==="변경이 완료되었습니다."){
                const currentUrl = window.location.pathname;
                window.location.href = currentUrl;
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    

    
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      }



    return(
        <div id="md_container">
            {/* <div style={{backgroundColor:"#701edb", height:"10px"}}></div> */}
        
            <div>
                <div id='md_upside'>
                    <div id='md_date'>{msgs.reason}</div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box style={{borderRadius:"10px"}} sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        <b>{title}</b><hr/>
                        </Typography>
                        <Typography style={{textAlign:"center"}} id="modal-modal-description" sx={{ mt: 2 }}>
                           <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <FcCancel color='red' size={25}/>&nbsp; 아래와 같은 이유로 펀딩이 취소되었습니다.<br/>
                            </div> 
                            <p><b style={{color:"red"}}>{msgs.reason}</b></p>
                            <div style={{justifyContent:"center", display:"flex",width:"100%" }} onClick={reqChecked}>
                                <OkButton/>
                            </div>
                        </Typography>
                        </Box>
                    </Modal>

                </div>{/**메세지 유형 */}
                <div id="md_content" onClick={handleOpen}>
                    <h4 style={{marginTop:"5px", marginBottom:"5px"}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <FcCancel color='red' size={25}/>&nbsp;
                        <b style={{color:"#701edb"}}>{msgs.username}</b>님이 참여하신 펀딩이 취소되었습니다.
                        </div>
                        </h4>
                    <div>{truncateText(title,30)}</div>
                    
                </div>{/**발송 날짜 및 */}
            </div>
       
        </div>
    )
}