import { Link } from "react-router-dom";

const Footer = ()=>{
  return (
    <div className="footer-container">
      <div className="footer-wrap ">
        <div className="nav-left-wrap container">
          
          <h1 className="nav-logo">Cinemaster</h1>

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
            <li>
              <Link className="nav-item" to="/*">
                Mypage
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;