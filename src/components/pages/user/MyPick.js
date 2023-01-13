import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import MovieModal from "../../modals/MovieModal";
import emptyBox from "./../../../assets/images/empty.png";
import { getMovieInfoByMovieId } from "../../../lib/api/tmdb";
import { getCart } from "lib/api/cart";

const MyMovieCard = ({ movieId }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getMovieInfoByMovieId(movieId).then(response => {
      setMovieInfo(response.data);
    })
  }, []);

  return (
    <>
      <div
        className="card set-inline"
        onClick={() => {
          setOpen(true);
          $("body").css("overflow", "hidden");
          $(".react-multiple-carousel__arrow").css("display", "none");
        }}
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${movieInfo.poster_path})`,
          margin: "15px 10px",
        }}
      ></div>
      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={movieId} />
    </>
  );
};

const MyPick = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [myMovieIds, setMyMovieIds] = useState([]);

  useEffect(() => {
    getCart(cookies.userData.shortId).then(response => {
      if (response.data.empty) {
        setMyMovieIds([]);
        return;
      }
      //찜영화의 아이디만 담긴 배열
      setMyMovieIds(response.data.result);
    })
  }, []);

  return (
    <>
      <div className="mt-4 flex-box-left">
        <span className="material-icons color-icons">bookmark</span>
        <h1 className="white-xl-font set-inline">My Pick</h1>
      </div>
      {myMovieIds.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={emptyBox}
            style={{ transform: "rotate(-5deg)" }}
            width="300px"
            className="m-5"
            alt="img"
          />
        </div>
      ) : (
        <>
          {myMovieIds.map((movieId, index) => (
            <MyMovieCard key={index} movieId={movieId} />
          ))}
        </>
      )}
    </>
  );
};

export default MyPick;
