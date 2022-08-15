import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../../data/port.json'
import {useCookies} from "react-cookie";
import $ from "jquery";

const ReviewCard = ({review, getReviewData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);


  const onClickDeleteBtn = ()=>{
    if(window.confirm("삭제 하시겠습니까?")){
      deleteReview().then(res=>{
        alert(res.data.result)
        getReviewData()
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  const deleteReview = async () => {
    return await axios.post(port.url + '/review/delete', {
      shortId: cookies.userData.shortId,
      movieId: review.movieId
    })
  }
  return (
    
    <div className="review-card">
      <div className="review-content">
        <h1 className='white-big-font center'>{review.title}</h1>
        <div className='right'>
          <span className='grey-small-font m-3'>{review.star}</span>
          <span className="star">
            ★★★★★
            <span style={{width: `${Number(review.star) * 10 * 2}%`}}>
              ★★★★★
            </span>
          </span>
        </div>
      </div>
      <div className="review-content">
        <p className='white-small-font mb-4'>
          {review.content}
        </p>
      </div>  
      <div className='review-content'>
        <div className='right'>
          <p className='grey-small-font foot'>
            {review.author}
            <span className='white-small-font time-box'>
              {review.createdAt}
            </span>
          </p>
          {
            cookies.userData && cookies.userData.shortId == review.shortId ? (
              <>
                <button type="button" className="button grey-button-small">
                  UPDATE
                </button>
                <button type="button" className="button grey-button-small" onClick={()=>{onClickDeleteBtn()}}>
                  DELETE
                </button>
              </>
            ) : (<></>)
          }
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;