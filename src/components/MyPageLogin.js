import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import port from "./../components/data/port.json";
import { useNavigate } from "react-router-dom";

const MyPageLogin = () => {
  const location = useLocation();
  const { email, profileImg } = location.state;
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  console.log("email", email);
  const onClickEnter = () => {
    sendSignInData()
      .then((res) => {
        console.log("로그인에 성공했습니다.");
        navigate("/mypage");
      })
      .catch((e) => {
        setErrMsg(e.response.data.fail);
      });
  };

  const sendSignInData = async () => {
    // console.log(signInData);
    return await axios.post(port.url + "/user/login", { email, password });
  };

  // 로그인 data를 입력받는 함수
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-page">
      <div className="form">
        <img
          alt="User Picture"
          src={profileImg}
          id="profile-image"
          height="240"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <p className="warning-text">{errMsg}</p>
        <button type="button" onClick={onClickEnter}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default MyPageLogin;
