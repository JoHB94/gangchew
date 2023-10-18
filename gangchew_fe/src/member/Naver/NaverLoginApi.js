import { SiNaver } from "react-icons/si";

const NaverLoginApi = (props) => {

  // const CLIENT_ID = "dLKPNhcR1nB4hOCwthgj";
  // const REDIRECT_URI = "http://localhost:3000/login/naver/callback";
  // const STATE = "fake";
  // const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}_STRING&redirect_uri=${REDIRECT_URI}`;

  const { naverUrl } = props;

  const loginHandle = () => {
    window.location.href = naverUrl;
  };

  return (
    <button className="socialLogButton" onClick={loginHandle}>
      <div className="naver-icon">
        <SiNaver size={25} style={{ color: "white" }} />
        <li className="">naver</li>
      </div>
    </button>
  );
};
export default NaverLoginApi;
