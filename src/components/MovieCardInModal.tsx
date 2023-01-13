import React from 'react';

interface IProps {
  movie_id: string;
  movie_poster: string;
  setMovieId: (movieId: string) => void;
}

const MovieCardInModal = ({ movie_id, movie_poster, setMovieId }: IProps) => {
  return (
    <>
      <img
        onClick={() => {
          setMovieId(movie_id);
        }}
        src={`https://www.themoviedb.org/t/p/w154${movie_poster}`}
        alt={movie_id}
      />
    </>
  );
};

export default MovieCardInModal;
