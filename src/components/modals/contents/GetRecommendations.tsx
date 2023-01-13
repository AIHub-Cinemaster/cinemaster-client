import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCardInModal from '../../MovieCardInModal';
import { getRecommendationedMovies } from '../../../lib/api/tmdb';
import { responsive } from 'styles/static';

interface IMovie {
  id: string;
  poster_path: string;
}

interface IProps {
  movieId: string;
  setMovieId: (movieId: string) => void;
}

const GetRecommendations = ({ movieId, setMovieId }: IProps) => {
  const [rcmdMovies, setRcmdMovies] = useState([]);

  useEffect(() => {
    getRecommendationedMovies(movieId).then((response) => {
      setRcmdMovies(response.data.results);
    });
  }, [movieId]);

  return (
    <div>
      <Carousel responsive={responsive} infinite={true}>
        {rcmdMovies.map((movie: IMovie, index) => (
          <MovieCardInModal
            key={index}
            movie_id={movie.id}
            movie_poster={movie.poster_path}
            setMovieId={setMovieId}
          />
        ))}
      </Carousel>
    </div>
  );
};
export default GetRecommendations;
