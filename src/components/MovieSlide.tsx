import React from 'react';
import Carousel from 'react-multi-carousel';
import MovieCard from './MovieCard';
import 'react-multi-carousel/lib/styles.css';
import { responsive, responsiveforRank } from 'styles/static';

interface IMovie {
  id: string;
  poster_path: string;
}

interface IProps {
  movies: IMovie[];
  isRanking: boolean;
}

const MovieSlide = ({ movies, isRanking = false }: IProps) => {
  return (
    <div>
      {isRanking ? (
        <>
          <Carousel
            responsive={responsiveforRank}
            autoPlay={false}
            infinite={false}
          >
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie_id={movie.id}
                movie_poster={movie.poster_path}
                isRanking={isRanking}
                rank={index + 1}
              />
            ))}
          </Carousel>
        </>
      ) : (
        <>
          <Carousel responsive={responsive} autoPlay={false} infinite={true}>
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie_id={movie.id}
                movie_poster={movie.poster_path}
                isRanking={isRanking}
                rank={index + 1}
              />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default MovieSlide;
