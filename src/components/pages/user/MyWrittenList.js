import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import port from "./../../../components/data/port.json";
import ReviewCard from "../../modals/contents/pages/ReviewCard";

const MyWrittenList = () => {
  const [reviewsByMovie, setReviewsByMovie] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(()=>{
    getReviewDataByMovie()
  },[])

  const getReviewDataByMovie = ()=>{
    try{
      axios.get(`${port.url}/review/user/${cookies.userData.shortId}`).then(res=>{
        setReviewsByMovie(res.data);
      })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReviewDataByMovie();
  }, []);

  return (
    <div>
      <div>
        {reviewsByMovie.map((review, index) => (
          <ReviewCard key={index} review={review} getReviewData={getReviewDataByMovie} />
        ))}
      </div>
    </div>
  );
};

export default MyWrittenList;
