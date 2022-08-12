import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  // loading이 true면 loading spinners, false면 data
  // true: data 도착전, false: data 도착후 or err
  if (loading) {
    return <ClipLoader color="#ffff" loading={loading} size={150} />;
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
        <h1>Ranking</h1>
        <MovieSlide movies={popularMovies} />
      </div>
      <div className="section-margin">
        <h1>Top Rated Movie</h1>
        <MovieSlide movies={topRatedMovies} />
      </div>
      <div className="section-margin">
        <h1>Upcoming Movie</h1>
        <MovieSlide movies={upComingMovies} />
      </div>

    </div>
  );
};

export default Home;
