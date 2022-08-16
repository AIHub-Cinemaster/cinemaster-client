import React from "react";
import { useSelector } from "react-redux";
import MovieModal from "./modals/MovieModal";
import { useEffect, useState } from 'react';
import {useCookies} from "react-cookie";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;


const MovieCard = ({ movie_id, movie_poster}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);


  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className="card"
        onClick={()=>{
          setOpen(true);
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
