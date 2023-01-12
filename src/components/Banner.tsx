import $ from 'jquery';

interface IProps {
  movie: {
    poster_path: string;
    title: string;
    overview: string;
    id: string;
  };
}

const Banner = ({ movie }: IProps) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          'url(' +
          `https://www.themoviedb.org/t/p/w220_and_h330_multi_faces${movie.poster_path}` +
          ')',
      }}
    >
      <div className="banner-cover">
        <div className="banner-info set-inline">
          <h1 className="white-xl-font mb-4">{movie.title}</h1>
          <span className="white-middle-font">SUMMARY</span>
          <p className="grey-small-font mt-1">{movie.overview}</p>
        </div>

        <div
          className="banner-card set-inline"
          style={{
            backgroundImage:
              'url(' +
              `https://www.themoviedb.org/t/p/w220_and_h330_multi_faces${movie.poster_path}` +
              ')',
          }}
          onClick={() => {
            $('#' + movie.id).click();
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
