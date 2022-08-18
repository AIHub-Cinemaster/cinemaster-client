import axios from 'axios';
import { useEffect, useState } from 'react';
import {useCookies} from "react-cookie";
import Update from './Update';

const ReviewCard = ({review, getReviewData, accessType}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);



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
    return await axios.post(process.env.REACT_APP_SERVER_URL + '/review/delete', {
      shortId: cookies.userData.shortId,
      movieId: review.movieId
    })
  }
  return (
    <>
      {
      updateIsOpen ? ( // 업데이트?
        <>
          <Update updateIsOpen={updateIsOpen} setUpdateIsOpen={setUpdateIsOpen} reviewId={review.reviewId} getReviewData={getReviewData} movieId={review.movieId} />
        </>
      ) : (
        <>
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
            <div className='review-content-last'>
              <div className='right nav-left-wrap'>

                <img id='profile-image-small' src={review.profileImg} />

                <p className='grey-small-font set-inline'>
                  {review.author}
                </p>

                <span className='white-small-font time-box'>
                  {review.createdAt}
                </span>
                { // 로그인이 되어있고 && 내가 작성한 글 ?
                  cookies.userData 
                    && cookies.userData.shortId == review.shortId
                    && accessType ? (
                    <>
                      <button type="button" className="button grey-button-small" onClick={()=>{setUpdateIsOpen(true)}}>
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

        </>
      )
    }
    
    
    </>
    
  )
}

export default ReviewCard;