import axios from "axios";
import { useEffect, useState } from "react";
import Create from "./pages/Create";
import { useCookies } from "react-cookie";
import ReviewCard from "./pages/ReviewCard";
import { useNavigate } from "react-router-dom";

const Reviews = ({ movieId }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [reviewsByMovie, setReviewsByMovie] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [accessIsReview, setAccessIsReview] = useState(true);

  useEffect(() => {
    getReviewDataByMovie(movieId);
  }, []);

  useEffect(() => {
    getReviewDataByMovie(movieId);
  }, [movieId]);

  const getReviewDataByMovie = (mid) => {
    try {
      axios
        .get(process.env.REACT_APP_SERVER_URL + `/reviewlist/${mid}`)
        .then((res) => {
          setReviewsByMovie(res.data);
          // console.log("efg", res.data)
        });
    } catch (error) {
      console.log(error);
    }
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
          {/* 리뷰작성버튼 */}
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
          {/* 리뷰리스트불러오기 */}
          {reviewsByMovie.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
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
