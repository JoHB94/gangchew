import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { getCookie } from "../../member/Cookie";
import { useNavigate } from "react-router-dom";

export default function Removeallbutton(props) {
  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigate = useNavigate();

  const removeAllHandle = () => { // 버튼을 누르면 해당 장바구니 게시물이 목록에서 제거됨
    const serverUrl = `${LOCAL_IP}/fundingcart/delete/all`;
    const requestMethod = "GET";
    
    axios({
      method: requestMethod,
      url: serverUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        if(response.data.code === 200) { // 장바구니 게시물 삭제 성공
            alert("삭제되었습니다!");
            window.location.reload();
        }

        if(response.data.code === 400) { //
            alert(response.data.message);
        }

      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  const buttonStyle = {
    width: "100%", // Automatically set the width
    height: "50px",
    backgroundColor: "#FFF",
    borderColor: "#701edb",
    color: "#701edb",
  };

  return (
    <Button style={buttonStyle} variant="outlined" onClick={removeAllHandle}>
      모두 제거
    </Button>
  );
}
