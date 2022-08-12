import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  return (
    <div className="nav-container">
      <div className="nav-wrap ">
        <div className="nav-left-wrap container">
          <Link style={{ display: "flex", alignItems: "center", textDecoration:"none",color:"white" }} to="/">
            <h1 className="nav-logo">CINEMASTER</h1>
          </Link>
          <ul>
            {/* <li>
              <Link style={{ display: "flex", alignItems: "center", textDecoration:"none",color:"white" }} to="/">
                <h1 className="nav-logo">CINEMASTER</h1>
              </Link>
            </li> */}
            {cookies.userData ? (
              <>
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
                <li>
                  <strong>{cookies.userData.name}</strong>님 로그인 중
                </li>
                <li>
                  <button type="button" onClick={()=>{
                    removeCookie("userData", {path:"/"});
                    // navigate("/")
                  }} style={{backgroundColor:"#ea4c88", color:"white", borderRadius:"8px"}}>LOGOUT</button>
                </li>
              </> 
            ):(
              <>
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
                
                <li>로그인을 해주세요</li>
              </>    
            )}
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default Header;
