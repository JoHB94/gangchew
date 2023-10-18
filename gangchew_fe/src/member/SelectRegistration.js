import "../member/css/SelectRegistration.css";
import { Link } from "react-router-dom";


function SelectRegistration(props) {
  console.log(props.socialUrl);

  const regKakao = () => {
    window.location.href = props.socialUrl.kakaoUrl;
  }

  const regNaver = () => {
    window.location.href = props.socialUrl.naverUrl;
  }

  return (
    <div>
      <div className="center">
        <div className="select-form-base">
          <div className="select-form">
            <p className="logo-name">GangChew</p>
            <button className="loginButton-local">
            <Link to="/registration"><p className="regName">내 정보로 간편가입</p></Link>
            </button>
            <hr />
            <button className="loginButton-kakao" id="regButton" onClick={regKakao}>
            <p className="regName">카카오로 간편가입</p>
            </button>
            <button className="loginButton-naver" id="regButton" onClick={regNaver}>
              <p className="regName">네이버로 간편가입</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectRegistration;
