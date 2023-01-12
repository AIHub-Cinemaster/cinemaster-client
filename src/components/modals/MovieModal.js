import Modal from "react-modal";
import { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import { customStyles } from "styles/static";

const GetRecommendations = lazy(() => import('./contents/GetRecommendations'));
const GetSimilarMovies = lazy(() => import('./contents/GetSimilarMovies'));
const Reviews = lazy(() => import('./contents/Reviews'));
const MovieTrailer = lazy(() => import('./contents/MovieTrailer'));
const MovieIntroduction = lazy(() => import('./contents/MovieIntroduction'));

const renderLoader = () => <p>Loading</p>;

Modal.setAppElement("#root");

const MovieModal = ({ isOpen, setOpen, movie_id }) => {
  const navigate = useNavigate("/");
  const [movieId, setMovieId] = useState(movie_id);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        $("body").css("overflow", "auto");
        $(".react-multiple-carousel__arrow").css("display", "inline-block");
        navigate("/");
        setOpen(false);
      }}
      style={customStyles}
    >
      <Suspense fallback={renderLoader()}>
      <MovieTrailer movieId={movieId} />
      <div className="modal-box">
        <MovieIntroduction movieId={movieId} />
        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          Recommendations
        </h1>
        <GetRecommendations movieId={movieId} setMovieId={setMovieId} />
        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          Similar Movies
        </h1>
        <GetSimilarMovies movieId={movieId} setMovieId={setMovieId} />
        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          REVIEW
        </h1>
        <Reviews movieId={movieId} />
      </div>
      </Suspense>
    </Modal>
  );
};

export default MovieModal;
