import { useCookies } from "react-cookie";

const MyProfile = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  

  return (
    <>
      <h1>프로필보기 및 수정</h1>
      <p>email: {cookies.userData.email}</p>
      <p>name: {cookies.userData.name}</p>
    </>
    
  )
}

export default MyProfile;