import { useEffect, useState } from 'react';
import BookMark from './BookMark';
import { getMovieInfoByMovieId } from '../../../lib/api/tmdb';

interface IProps {
  movieId: string;
}
const MovieIntroduction = ({ movieId }: IProps) => {
  const [movieInfo, setMovieInfo] = useState<any>({});

  useEffect(() => {
    getMovieInfoByMovieId(movieId).then((res) => {
      setMovieInfo(res.data);
    });
  }, [movieId]);

  return (
    <>
      <div className="movie-info-area">
        <div className="flex-box">
          <div>
            <h1 className="white-xl-font">{movieInfo.original_title}</h1>
            <p className="grey-small-font mb-5">
              {movieInfo.release_date}&nbsp;/&nbsp;
              {parseInt(movieInfo.runtime) / 60 +
                'h ' +
                (movieInfo.runtime % 60) +
                'min'}
              &nbsp;/&nbsp;
              {movieInfo.genres ? (
                <>
                  {movieInfo.genres.map((genre: { name: string }) => {
                    return genre.name + ' ';
                  })}
                </>
              ) : (
                <> {movieInfo.tagline} </>
              )}
            </p>
          </div>
          <BookMark movieId={movieId} />
        </div>

        <p className="white-small-font">SUMMARY</p>
        <p className="grey-small-font">{movieInfo.overview}</p>
      </div>
    </>
  );
};

export default MovieIntroduction;
