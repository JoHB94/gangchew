import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoLoginApi = () => {

  const REST_API_KEY = "c6b9f677567dc977d7f9c94dd4cc157f";
  const REDIRECT_URI = "http://localhost:3000/login/kakao/callback";

  //OAuth요청 URL
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,profile_image`; // 카카오 api 요청 Url

  const loginHandle = () => {
    window.location.href = kakaoUrl; // Url로 리다이렉트 
  };
  return (
    <button className="socialLogButton" onClick={loginHandle}>
      <div className="kakao-icon">
        <RiKakaoTalkFill
          size={45}
          style={{
            color: "#341808",
            backgroundColor: "yellow",
            borderRadius: "5px",
          }}
        />
        <li>kakao</li>
      </div>
    </button>
  );
};
export default KakaoLoginApi;