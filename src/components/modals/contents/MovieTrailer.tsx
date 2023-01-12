import { useEffect, useState } from 'react';
import { getTrailerByMovieId } from '../../../lib/api/tmdb';

interface IProps {
  movieId: string;
}

const MovieTrailer = ({ movieId }: IProps) => {
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    getTrailerByMovieId(movieId).then((response) => {
      response.data.results.forEach((video: any) => {
        if (video.type === 'Trailer') {
          setTrailerKey(video.key);
        }
      });
    });
  }, [movieId]);

  let youtubeUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`;

  return (
    <>
      <div className="trailer-box">
        <iframe
          style={{ width: '850px', height: '480px', border: 'none' }}
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </>
  );
};

export default MovieTrailer;
