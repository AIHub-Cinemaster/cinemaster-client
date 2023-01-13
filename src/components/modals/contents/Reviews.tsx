import { useEffect, useState } from 'react';
import Create from './pages/Create';
import { useCookies } from 'react-cookie';
import ReviewCard from './pages/ReviewCard';
import { useNavigate } from 'react-router-dom';
import { getReviewsByMovie } from 'lib/api/reviewlist';

interface IProps {
  movieId: string;
}

const Reviews = ({ movieId }: IProps) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  const [reviewsByMovie, setReviewsByMovie] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [accessIsReview, setAccessIsReview] = useState(true);
  const [createAuth, setCreateAuth] = useState(true);

  useEffect(() => {
    getReviewDataByMovie(movieId);
  }, [movieId]);

  useEffect(() => {
    if (cookies.userData) {
      reviewsByMovie.forEach((review: any) => {
        if (review.shortId === cookies.userData.shortId) {
          setCreateAuth(false);
          return;
        }
      });
    } else {
      setCreateAuth(false);
    }
  }, [reviewsByMovie]);

  const getReviewDataByMovie = (movieId: string) => {
    getReviewsByMovie(movieId).then((response) => {
      setReviewsByMovie(response.data);
    });
  };

  return (
    <>
      {createIsOpen ? (
        <Create
          setCreateIsOpen={setCreateIsOpen}
          movieId={movieId}
          getReviewDataByMovie={getReviewDataByMovie}
        />
      ) : (
        <>
          {
            // 리뷰작성권한 : 로그인상태 && 이전 작성글 없음
            createAuth ? (
              <>
                <div
                  className="review-create-btn"
                  onClick={() => {
                    if (!cookies.userData) {
                      navigate('/login');
                    } else {
                      setCreateIsOpen(true);
                    }
                  }}
                >
                  <h2 className="white-xl-font">
                    <span className="material-symbols-outlined grey-icons">
                      post_add
                    </span>
                  </h2>
                </div>
              </>
            ) : (
              <></>
            )
          }

          {reviewsByMovie.forEach((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              setCreateAuth={setCreateAuth}
              getReviewData={getReviewDataByMovie}
              accessType={accessIsReview}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Reviews;
