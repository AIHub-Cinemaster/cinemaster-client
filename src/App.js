import { Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import KakaoCallBack from "./pages/user/KakaoCallback";
import NaverCallBack from "./pages/user/NaverCallback";
import Footer from "./components/Footer";
import MyPage from "./pages/MyPage";


function App() {
  return (
    <div className="root-wrap">
      <Header />
      <div className="container" id="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />}/>
            <Route path="naver/callback" element={<NaverCallBack />}/>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
