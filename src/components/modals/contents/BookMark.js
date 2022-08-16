import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../data/port.json'
import {useCookies} from "react-cookie";
import $ from "jquery";

const BookMark = ({movieId})=>{

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [myCart, setMyCart] = useState([]);
  // const [isMine, setIsMine] = useState("");
  const [inCart, setInCart] = useState("");

  useEffect(()=>{
    if (cookies.userData) {
      cartInit(); //장바구니 서버에서 가져오기
    }
  },[])
  useEffect(()=>{
    if (cookies.userData) {
      cartInit(); //장바구니 서버에서 가져오기
    }
  },[movieId])

  
  const cartInit = () => {
    axios.get(`${port.url}/cart/list/${cookies.userData.shortId}`).then((res) => {
      setInCart(res.data.result.includes(String(movieId)))        
    }).catch((err) => {
      console.log(err);
    });
  };

  const onClickBookMark = () => {
    axios.post(port.url + "/cart/toggle", {
      shortId: cookies.userData.shortId,
      movieId: movieId
    }).then(res=>{
      setInCart(res.data.bookmark)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="bookmark-area ">
        {
          inCart ? (
            // 내목록안에 담겨있으면 눌렀을 떄, 장바구니 취소
            <>
              <span className="material-icons color-icons" 
                onClick={()=>{onClickBookMark()}} >
                bookmark
              </span>
            </>
          ) : (
            // 내목록안에 없으면 눌렀을 떄, 장바구니 담기
            <>
              <span className="material-icons grey-icons" 
                onClick={()=>{onClickBookMark()}} >
                bookmark
              </span>
            </>
          )
        }
    </div>
  </>
  )
}

export default BookMark;