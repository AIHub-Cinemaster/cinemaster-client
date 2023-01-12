import { useState } from 'react';
import React, { lazy, Suspense } from 'react';
import $ from 'jquery';

const MovieModal = lazy(() => import('./modals/MovieModal'));
const renderLoader = () => <p>Loading</p>;

interface IProps {
  movie_id: string;
  movie_poster: string;
  isRanking: boolean;
  rank: number;
}

const MovieCard = ({ movie_id, movie_poster, isRanking, rank }: IProps) => {
  const [isOpen, setOpen] = useState(false);

  const onClickPoster = () => {
    setOpen(true);
    $('body').css('overflow', 'hidden');
    $('.react-multiple-carousel__arrow').css('display', 'none');
  };

  return (
    <>
      {isRanking ? (
        <>
          <div
            id={movie_id}
            className="rank-card"
            onClick={onClickPoster}
            style={{
              backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${movie_poster})`,
            }}
          >
            <span className="rank">{rank}</span>
          </div>
        </>
      ) : (
        <>
          <div
            id={movie_id}
            className="card"
            onClick={onClickPoster}
            style={{
              backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${movie_poster})`,
            }}
          ></div>
        </>
      )}
      <Suspense fallback={renderLoader()}>
        <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={movie_id} />
      </Suspense>
    </>
  );
};

export default MovieCard;
