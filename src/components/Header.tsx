import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { getUserInfo } from 'lib/api/user';

interface IMyInfo {
  profileImg: string;
  type: string;
  email: string;
  name: string;
  shortId: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<IMyInfo>({
    profileImg: '',
    type: '',
    email: '',
    name: '',
    shortId: '',
  });
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  /*
  TODO : AutoCompelete 기능
  */
  useEffect(() => {
    if (cookies.userData) {
      getUserInfo(cookies.userData.shortId).then((response) => {
        setMyInfo(response.data);
      });
    }
  }, []);

  return (
    <header>
      <div className="nav-container">
        <div className="nav-wrap container">
          <div className="nav-left-wrap ">
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              to="/"
            >
              <h1 className="nav-logo color-big-font pointer">
                <strong>CINEMASTER</strong>
              </h1>
            </Link>
            {cookies.userData ? (
              <>
                <ul>
                  <li>
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                      }}
                      to="/eval"
                    >
                      <h1 className="white-middle-font menu-item">
                        Evaluation
                      </h1>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                      }}
                      to="/mypick"
                    >
                      <h1 className="white-middle-font menu-item">My Pick</h1>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>

          {
            // 메인 화면에서만 검색창 표시
            window.location.pathname === '/' ? (
              <div className="nav-middle-wrap">
                <SearchBar />
              </div>
            ) : (
              <></>
            )
          }

          <div className="nav-right-wrap">
            {cookies.userData ? (
              <>
                <img
                  src={myInfo.profileImg}
                  id="profile-image-small"
                  alt="profile"
                />
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <p
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, <strong>{cookies.userData.name}</strong> !
                    </p>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        {myInfo.type === 'local' ? (
                          <>
                            <Link
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                              }}
                              state={{
                                email: myInfo.email,
                                profileImg: myInfo.profileImg,
                              }}
                              className="dropdown-item"
                              to="/identification"
                            >
                              Profile Edit
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                              }}
                              className="dropdown-item"
                              to="/myprofile"
                            >
                              Profile Edit
                            </Link>
                          </>
                        )}
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                          }}
                          className="dropdown-item"
                          to="/writtenlist"
                        >
                          My Written List
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                          }}
                          className="dropdown-item"
                          to="/myreport"
                        >
                          My Report
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <p
                          className="dropdown-item pointer"
                          onClick={() => {
                            removeCookie('userData', { path: '/' });
                            navigate('/');
                            window.location.reload();
                          }}
                        >
                          LOGOUT
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                      }}
                      className="white-middle-font"
                      to="/login"
                    >
                      <h1 className="white-middle-font menu-item">Login</h1>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;