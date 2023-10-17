import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Cookie";
import axios from "axios";

const KakaoRedirect = () => {
  const code = window.location.search;
  const requestUrl = `http://localhost:9000/login/kakao/callback${code}`; // 소셜 로그인 콜백 요청 url
  const requestMethod = "GET";
  
  const navigate = useNavigate();

  useEffect(() => {

    axios({
      method: requestMethod,
      url: requestUrl,
    })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        if(response.data.code === 200) {
            setCookie("jwtToken", response.data.result.jwtToken, {maxAge: 60 * 60, path: "/"});
            alert(response.data.message);
            window.location.href ="/";
        }else {
            alert(response.data.message);
            window.location.href = "/login";
        }
    })
      .catch((error) => {
        console.error("오류 발생:", error);
        // 오류 처리 코드를 추가
      });

  }, []);



  return <div>로그인 중입니다.</div>;
};
export default KakaoRedirect;
