import "../member/css/SelectRegistration.css";
import { Link } from "react-router-dom";


function SelectRegistration() {
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
            <button className="loginButton-kakao" id="regButton">
            <p className="regName">카카오로 간편가입</p>
            </button>
            <button className="loginButton-naver" id="regButton">
              <p className="regName">네이버로 간편가입</p>
            </button>
            <button className="loginButton-facebook" id="regButton">
              <p className="regName">페이스북으로 간편가입</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectRegistration;
