import axios from 'axios';
import { useEffect, useState } from 'react';
import port from './../../data/port.json'
import Create from './pages/Create';
import plusIcon from './../../../assets/images/plus.png'

const Reviews = (props)=>{
  const [reviewData, setReviewData] = useState([]);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  useEffect(()=>{
    getReviewData()
  },[])

  const getReviewData = ()=>{
    try{
      axios.get(port.url + `/review/${[props.id]}`).then(res=>{
        console.log("get review", res.data)
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
            <div className="review-create-btn" onClick={()=>{setCreateIsOpen(true)}}>
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
      


      {/* <button onClick={()=>{
          setCreateIsOpen(true)
        }} className="btn" style={{backgroundColor:"#ea4c88", color:"white"}}>CREATE</button> */}
      {
        // createIsOpen ? (
        //   <Create createIsOpen={createIsOpen} setCreateIsOpen={setCreateIsOpen} movieId={props.id} getReviewData={getReviewData}/>
        // ) : (
          
        // )
      }

      
    </>
    
  )
}

export default Reviews;