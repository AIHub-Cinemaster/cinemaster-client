import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Evaluation from './Evaluation';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Identification from './Identification';
import Login from './Login';
import NotFound from './NotFound';
import KakaoCallBack from './pages/user/KakaoCallback';
import MyPick from './pages/user/MyPick';
import MyProfile from './pages/user/MyProfile';
import MyWrittenList from './pages/user/MyWrittenList';
import NaverCallBack from './pages/user/NaverCallback';
import MyReport from './report/MyReport';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eval" element={<Evaluation />} />
          <Route path="/mypick" element={<MyPick />} />
          <Route path="/writtenlist" element={<MyWrittenList />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/myreport" element={<MyReport />} />
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />} />
            <Route path="naver/callback" element={<NaverCallBack />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
