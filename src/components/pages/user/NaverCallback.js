import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { sendNaver } from 'lib/api/auth';

const NaverCallBack = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['userData']);

  // 네이버연동 2번
  // kakao에서 redirect 해준 code 가져오는 부분
  const NAVER_PARAMS = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    sendNaver(NAVER_PARAMS).then((response) => {
      if (response.data.login) {
        setCookie('userData', response.data, { path: '/' });
        navigate('/');
      }
    }).catch((error) => {
      navigate('/');
    });
  }, []);

  return <></>;
};

export default NaverCallBack;
