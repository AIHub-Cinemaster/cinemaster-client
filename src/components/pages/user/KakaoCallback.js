import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { sendKakao } from "lib/api/auth";

const KakaoCallBack = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  // 카카오연동 2번
  // kakao에서 redirect 해준 code 가져오는 부분
  const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    sendKakao(KAKAO_PARAMS).then(response => {
        if (response.data.login) {
          // true면 로그인이 되어있는 상태
          setCookie("userData", response.data, { path: "/" });
          navigate("/");
        }
      }).catch(error => {
        navigate("/");
      });
  }, []);

  return <></>
};

export default KakaoCallBack;