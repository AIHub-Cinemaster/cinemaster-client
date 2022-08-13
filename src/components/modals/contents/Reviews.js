import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../data/port.json'
import Create from './pages/Create';
import {useCookies} from "react-cookie";
import $ from "jquery";



const Reviews = (props)=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [reviewData, setReviewData] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  useEffect(()=>{
    getReviewData()
  },[])

  const getReviewData = ()=>{

    // return await axios.get(port.url + `/reviewlist/${props.id}`)
    try{
      axios.get(port.url + `/reviewlist/${props.id}`).then(res=>{
        // console.log("get review", res.data)
        setReviewData(res.data);
      })
    } catch(error) {
      console.log("in Review.js", error)
    }
  }

  // const colorizeStar = (event)=>{
  //   $(`.star span`).css({ width: `${event.target.value * 10}%` });
  //   console.log(event.target.value/2)
  // }
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
      movieId:props.id
    })
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
                    <div className="review-content">
                      <span className="star">
                        ★★★★★
                        <span>★★★★★</span>
                        {/* <input type="range" defaultValue="4" step="1" min="0" max="10" onChange={colorizeStar} disabled/> */}
                      </span>
                    </div>      
                    <div className="review-content">{item.content}</div>
                    <div className="review-content">{item.author}</div>
                    {
                      cookies.userData.name == item.author ? (
                        <>
                          <div>
                            <button type="button">수정</button>
                            <button type="button" onClick={()=>{onClickDeleteBtn()}}>삭제</button>
                          </div>
                        </>
                      ) : (<></>)
                    }
                    
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