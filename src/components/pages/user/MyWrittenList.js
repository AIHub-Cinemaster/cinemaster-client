import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import ReviewCard from "../../modals/contents/pages/ReviewCard";
import MovieModal from "../../modals/MovieModal";

const ReviewBox = ({review, getReviewDataByUser}) =>{
  const [isOpen, setOpen] = useState(false);

  useEffect(()=>{
    getReviewDataByUser()
  },[isOpen])

  return (
    <>
      <div onClick={()=>{
          setOpen(true);
          $('body').css("overflow", "hidden");
          $('.react-multiple-carousel__arrow').css("display", "none");
        }} >
          <ReviewCard 
            review={review} 
            getReviewData={getReviewDataByUser}
          />
      </div>
      
      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={review.movieId} />
    </>
  )
}

const MyWrittenList = () => {
  const [reviewsByUser, setReviewsByUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(()=>{
    getReviewDataByUser()
  },[])

  

  const getReviewDataByUser = ()=>{
    try{
      axios.get(`${process.env.REACT_APP_SERVER_URL}/review/user/${cookies.userData.shortId}`).then(res=>{
        setReviewsByUser(res.data);
      })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReviewDataByUser();
  }, []);

  return (
    <>
      {
        reviewsByUser.length === 0 ? (
          <></>
        ) : (
          <>
            {reviewsByUser.map((review, index) => (
              <ReviewBox key={index} review={review} getReviewDataByUser={getReviewDataByUser} />
            ))}
          </>
        )
      }
    </>
  );
};

export default MyWrittenList;
