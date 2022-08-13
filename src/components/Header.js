import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import port from "./data/port.json"
import { contains } from "jquery";



const Header = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(()=>{
    if(cookies.userData){
      getUserInfo().then(res=>{
        setMyInfo(res.data)
        // window.location.reload();
      }).catch(err=>{
        console.log(err)
      })
    }
  },[])
  
  const getUserInfo = async () =>{
    return await axios.get(`${port.url}/user/${cookies.userData.shortId}`)
  }
  return (
    <div className="nav-container">
      <div className="nav-wrap ">
        <div className="nav-left-wrap container">
          <Link style={{ display: "flex", alignItems: "center", textDecoration:"none",color:"white" }} to="/">
            <h1 className="nav-logo">CINEMASTER</h1>
          </Link>
          
            {cookies.userData ? (
              <>
                <ul>
                  <li>
                    <Link className="nav-item" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-item" to="/mypage">
                      Mypage
                    </Link>
                  </li>
                  
                </ul>
                <div className="nav-right-wrap">
                  <img src={myInfo.profileImg} id="profile-image-small" />
                  
                  <strong>{cookies.userData.name}</strong>님 로그인 중
                
                  <button type="button" onClick={()=>{
                    removeCookie("userData", {path:"/"});
                    navigate("/")
                    window.location.reload();
                  }}>LOGOUT</button>
                </div>
              </>
              
            ):(
              <>
                <ul>
                  <li>
                    <Link className="nav-item" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-item" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </>
            )}
          
          
        </div>

        
        
                
      </div>
    </div>
  );
};

export default Header;
