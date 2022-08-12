import React from "react";
import { useSelector } from "react-redux";
import MovieModal from "./modals/MovieModal";
import { useEffect, useState } from 'react';

const MovieCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movie);

  const [isOpen, setOpen] = useState(false);

  const handleClick = ()=>{
    setOpen(true);
  }

  return (
    <>
      <div
        className="card"
        onClick={handleClick}
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
            ")",
          margin:"15px 10px"
        }}
      >
        <div className="overlay">
          <h1 style={{fontSize:"20px"}}>{item.title}</h1><br/>
          <div>
            {item.genre_ids.map(
              (id) => genreList.find((item) => item.id === id).name
            )}
          </div>
          <div>
            <span>{item.vote_average}</span>
          </div>
        </div>
      </div>

      <MovieModal isOpen={isOpen} setOpen={setOpen} data={item}/>
    </>
    

  );
};

export default MovieCard;
