import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery';
import { getMovieInfoByMovieId } from '../../../../lib/api/tmdb';
import { sendCreateReview } from 'lib/api/review';

interface IProps {
  setCreateIsOpen: (createIsOpen: boolean) => void;
  movieId: string;
  getReviewDataByMovie: any;
}

const Create = ({ setCreateIsOpen, movieId, getReviewDataByMovie }: IProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);

  const [createReview, setCreateReview] = useState<any>({
    movieId: movieId,
    title: '',
    content: '',
    shortId: cookies.userData.shortId,
    star: 0,
    genreList: [],
  });

  let temp: any[] = [];

  useEffect(() => {
    getMovieInfoByMovieId(movieId)
      .then((res) => {
        res.data.genres.forEach((genre: any) => {
          temp.push(genre.name);
        });
        setCreateReview({
          ...createReview,
          genreList: temp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeCreateReview = (event: any) => {
    // value 값에 따라 별 색칠
    if (event.target.name === 'star') {
      $(`.star span`).css({ width: `${event.target.value * 10 * 2}%` });
    }

    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value,
    });
  };

  const onClickCreateReviewButton = () => {
    sendCreateReview(createReview)
      .then((response) => {
        setCreateIsOpen(false);
        getReviewDataByMovie(movieId);
      })
      .catch((error) => {
        alert(error.response.data.fail);
      });
  };

  return (
    <div className="review-create-card">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          TITLE
        </label>
        <input
          type="text"
          className="form-control"
          onChange={onChangeCreateReview}
          name="title"
          id="title"
          placeholder="Title Here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="star" className="form-label">
          STAR
        </label>
        <br />
        <span className="star">
          ★★★★★
          <span>★★★★★</span>
          <input
            name="star"
            type="range"
            step=".5"
            min="0"
            max="5"
            onChange={onChangeCreateReview}
          />
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          CONTENT
        </label>
        <textarea
          className="form-control"
          onChange={onChangeCreateReview}
          name="content"
          id="content"
          placeholder="Content Here"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder={cookies.userData.name}
          disabled
        />
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          type="button"
          onClick={() => onClickCreateReviewButton()}
          className="button grey-button-small"
          style={{ marginRight: '5px' }}
        >
          SUBMIT
        </button>
        <button
          type="button"
          onClick={() => {
            setCreateIsOpen(false);
          }}
          className="button grey-button-small"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default Create;
