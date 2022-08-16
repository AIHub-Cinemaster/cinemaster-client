import React, { useEffect, useState } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useCookies } from "react-cookie";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import "./../assets/css/App.css";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } =
    useSelector((state) => state.movie);


  useEffect(() => {
    dispatch(movieAction.getMovies());
    }, []);


  // loading이 true면 loading spinners, false면 data
  // true: data 도착전, false: data 도착후 or err
  if (loading) {
    return (
      <div className="loading-box">
        <ClipLoader color="#ffff" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div>
      {popularMovies.results && (
        <Banner
          movie={
            popularMovies.results[
              Math.floor(Math.random() * popularMovies.results.length)
            ]
          }
        />
      )}

      <div className="section-margin">
        <h1 className="white-big-font">Ranking</h1>
        <MovieSlide movies={popularMovies.results} />
      </div>
      <div className="section-margin">
        <h1 className="white-big-font">Top Rated Movie</h1>
        <MovieSlide movies={topRatedMovies.results} />
      </div>
      <div className="section-margin">
        <h1 className="white-big-font">Upcoming Movie</h1>
        <MovieSlide movies={upComingMovies.results} />
      </div>
    </div>
  );
};

export default Home;
