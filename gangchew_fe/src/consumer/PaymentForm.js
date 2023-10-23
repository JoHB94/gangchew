import React, { useState } from "react";
import { TextField, Button, Box, Modal, Fade } from '@mui/material';
import { getCookie } from '../member/Cookie';
import axios from "axios";

const PaymentForm = ({ open, handleClose }) => {

  const [funding, setFunding] = useState({
    id: 0,
    title: '',
    amount: 0,
    thumbnail: '',
  });

  const [payment, setPayment] = useState({
    bank_name: '',
    bank_account: '',
  });

  const cloudIP = 'http://138.2.114.150:9000';
  const localIP = 'http://localhost:9000';
  const currentUserID = 'user123';

  

  

  const handlePayment = () => {
    console.log("handlePayment", payment);

    // 결제 버튼 클릭 이벤트를 처리하고 데이터를 서버로 보내는 코드
    let token = '';

  if (getCookie("jwtToken") !== undefined){
      token = getCookie("jwtToken");
      console.log(token);
  }
  const axiosInstance = axios.create({
      headers:{
        'Content-Type': 'application/json',
      }
    });

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosInstance.post(localIP + '/payment/create', payment)
      .then((res) => {
        console.log("응답", res.data); // 응답 데이터 처리
        if(res.message === "이미 결제 정보가 등록되었습니다."){
          alert('이미 결제하셨습니다.')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBankNameChange = (event) => {
    setPayment({ ...payment, bank_name: event.target.value });
  };

  const handleBankAccountChange = (event) => {
    setPayment({ ...payment, bank_account: event.target.value });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={(props) => (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0. 0)',
          }}
        />
      )}
      BackdropProps={{}}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            p: 3,
            borderRadius: 10,
            boxShadow: 3,
            width: 300,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2>결제 정보 입력</h2>
          <form>
            <TextField
              label="은행명"
              variant="outlined"
              fullWidth
              margin="normal"
              value={payment.bank_name}
              onChange={handleBankNameChange}
            />
            <TextField
              label="계좌번호"
              variant="outlined"
              fullWidth
              margin="normal"
              value={payment.bank_account}
              onChange={handleBankAccountChange}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: '#000', color: '#fff' }}
              onClick={handlePayment}
            >
              결제하기
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PaymentForm;