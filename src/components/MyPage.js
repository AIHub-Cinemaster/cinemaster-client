import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from './data/port.json'
import MyProfile from "./pages/user/MyProfile";
import MyWishList from "./pages/user/MyWishList";
import MyWrittenList from "./pages/user/MyWrittenList";


const MyPage = ()=>{
  const [wishList, setWishList] = useState([]); //하트누른목록

  useEffect(()=>{
    getCartList().then(res=>{
      setWishList(res.data.result)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const getCartList = async () => {
    return await axios.get(`${port.url}/cart/list/${cookies.userData.email}`)
  }

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [view, setView] = useState({
    profile: true,
    wishlist: false,
    writtenlist: false,
  })

  return (
    <>
      {
        cookies.userData ? (
          <>
            <h1>{cookies.userData.name}님의 마이페이지</h1>
            <button onClick={()=>{
                setView({
                  profile: true,
                  wishlist: false,
                  writtenlist: false,
                })
              }} className="btn btn-primary">Profile</button>

              <button onClick={()=>{
                setView({
                  profile: false,
                  wishlist: true,
                  writtenlist: false,
                })
              }} className="btn btn-primary">Wish List</button>

              <button onClick={()=>{
                setView({
                  profile: false,
                  wishlist: false,
                  writtenlist: true,
                })
              }} className="btn btn-primary">Written List</button>

              {
                view.profile ? (<MyProfile />) : (<></>)
              }
              {
                view.wishlist ? (<MyWishList wishList={wishList} />) : (<></>)
              }
              {
                view.writtenlist ? (<MyWrittenList />) : (<></>)
              }
          </>
          
        ):(<>로그인이 필요합니다.</>)
      }
      
    </>

  )
}

export default MyPage;