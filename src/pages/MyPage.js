import { useCookies } from "react-cookie";


const MyPage = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  console.log(cookies.userData);

  return (
    <div>{cookies.userData.name}님의 마이페이지입니다.</div>

  )
}

export default MyPage;