import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {FaCircleChevronRight} from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../member/Cookie';
import { useParams } from 'react-router-dom';

export default function DoFunding() {
  const requestUrl = "http://localhost:9000/login/cookie";
  const requestMethod ="GET";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
  const navigate = useNavigate();
  const { fundingId } = useParams();

  /* 로그인 여부를 확인 */
  const doFundingHandle = () => {
    axios({
      method: requestMethod,
      url: requestUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("서버 응답 데이터:", response.data);
      /* 로그인 성공시 /myactivitypayment/:fundingId 로 이동 */
      if(response.data.code === 200) {
        navigate(`/myactivitypayment/${fundingId}`);
      }
    })
    .catch((error) => {
      console.error("오류 발생:", error);
      alert("로그인 상태가 아닙니다! 로그인을 진행해주세요");
    })
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" size='large' style={{backgroundColor: '#701edb', color:'#FFFFFF'}} onClick={doFundingHandle}>
        <h2>펀딩 참여하기</h2>
        &nbsp;<FaCircleChevronRight size={35}/>
        </Button>
    </Stack>
  );
}