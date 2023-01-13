import { useEffect, useState } from "react";
import Create from "./pages/Create";
import { useCookies } from "react-cookie";
import ReviewCard from "./pages/ReviewCard";
import { useNavigate } from "react-router-dom";
import { getReviewsByMovie } from "lib/api/reviewlist";

const Reviews = ({ movieId }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [reviewsByMovie, setReviewsByMovie] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [accessIsReview, setAccessIsReview] = useState(true);
  const [createAuth, setCreateAuth] = useState(true);

  useEffect(() => {
    getReviewDataByMovie(movieId);
  }, [movieId]);

  useEffect(()=>{
    if(cookies.userData){
      reviewsByMovie.forEach((review) => {
        if(review.shortId === cookies.userData.shortId){
          setCreateAuth(false);
          return
        }
      })
    } else { 
      setCreateAuth(false);
    }
  },[reviewsByMovie])

  const getReviewDataByMovie = (movieId) => {
    getReviewsByMovie(movieId).then((response) => {
      setReviewsByMovie(response.data);
    });
  };

  return (
    <>
      {createIsOpen ? (
        <Create
          createIsOpen={createIsOpen}
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
                      // alert("로그인을 해주세요");
                      navigate("/login");
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
            ) : (<></>)
          }
          
          {/* 리뷰리스트불러오기 */}
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
