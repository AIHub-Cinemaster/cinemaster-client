import React from "react";
import MovieModal from "./modals/MovieModal";
import { useEffect, useState } from 'react';
import {useCookies} from "react-cookie";
import $ from 'jquery'


const MovieCard = ({ movie_id, movie_poster}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className="card"
        onClick={()=>{
          setOpen(true);
          $('body').css("overflow", "hidden");
          $('.react-multiple-carousel__arrow').css("display", "none");
        }}
        style={{
          backgroundImage:
            `url(https://www.themoviedb.org/t/p/w220_and_h330_face${movie_poster})`,
          margin:"15px 10px"
        }}
      >
      </div>

      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={movie_id} />
    </>
  );
};

export default MovieCard;
