import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function RefundButton(props) {
  const LOCAL_IP = "http://localhost:9000";
  const requestMethod ="GET";
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const NOW_DATE = `${year}년 ${month}월 ${day}일`;

  const refundHandler = () => {
    if (window.confirm(`강의명: ${props.title}\n환불 금액: ${props.amount}원\n환불 요청일: ${NOW_DATE}\n\n환불 규정에 따라 환불은 펀딩의 마감일 이후에 진행됩니다.\n정말 환불하시겠습니까?\n`)) {
        const requestData = async () => {
            try {
              const response = await axios({
                url: `${LOCAL_IP}/participants/delete?funding=${props.fundingId}`, // fundingId에 맞는 게시물을 삭제처리
                method: requestMethod,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log("받은 데이터: ", response.data);
              alert("환불처리 되었습니다!");
              window.location.reload();

            } catch (error) {
              console.error("오류 발생:", error);
            }
          };
          requestData();
        }else {
            alert("환불이 중단되었습니다!")
        }
  }



  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" style={{ color: '#fff', background: '#000', bottom: "8px", left: "60px"}} onClick={refundHandler}>
        환불하기
      </Button>
    </Stack>
  );
}