import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../data/port.json'
import Create from './pages/Create';
import {useCookies} from "react-cookie";
import $ from "jquery";
import ReviewCard from './pages/ReviewCard';

//무비아이디 부재
const Reviews = (props)=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [reviewsByUser, setReviewsByUser] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  useEffect(()=>{
    getReviewDataByUser()
  },[])

  const getReviewDataByUser = ()=>{
    try{
      axios.get(port.url + `/reviewlist/${props.id}`).then(res=>{
        setReviewsByUser(res.data);
      })
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        createIsOpen ? (
          <Create createIsOpen={createIsOpen} setCreateIsOpen={setCreateIsOpen} movieId={props.id} getReviewDataByUser={getReviewDataByUser}/>
        ) : (
          <>
            <div className="review-create-btn" onClick={()=>{
              if(!cookies.userData){
                alert('로그인을 해주세요')
              } else {
                setCreateIsOpen(true)
              }}}>
              <h2 className='white-xl-font'>Write Here!</h2>
            </div>
              {
                reviewsByUser.map((review, index)=>(
                    <ReviewCard key={index} review={review} getReviewData={getReviewDataByUser} />
                ))
              }
          </>
        )
      }
    </>
    
  )
}

export default Reviews;