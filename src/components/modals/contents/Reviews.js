import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../data/port.json'
import Create from './pages/Create';
import {useCookies} from "react-cookie";


const Reviews = (props)=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [reviewData, setReviewData] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  useEffect(()=>{
    getReviewData()
  },[])

  const getReviewData = ()=>{
    try{
      axios.get(port.url + `/review/${[props.id]}`).then(res=>{
        // console.log("get review", res.data)
        setReviewData(res.data);
      })
    } catch(error) {
      console.log("fail get review", error)
    }
  }


  return (
    <>
      {
        createIsOpen ? (
          <Create createIsOpen={createIsOpen} setCreateIsOpen={setCreateIsOpen} movieId={props.id} getReviewData={getReviewData}/>
        ) : (
          <>
            <div className="review-create-btn" onClick={()=>{
              if(!cookies.userData){
                alert('로그인을 해주세요')
              } else {
                setCreateIsOpen(true)
              }}}>
              <h2>Click Here!</h2>
            </div>

            <div>          
              {
                reviewData.map((item, index)=>(
                  <div key={index} className="review-card">
                    <div className="review-content">{item.title}</div>
                    <div className="review-content">{item.content}</div>
                    <div className="review-content">{item.author}</div>
                    <div></div>
                  </div>
                ))
              }
            </div>
          </>
          
        )
      }

      
    </>
    
  )
}

export default Reviews;