import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import emptyBox from './../../assets/images/empty.png'
import StarHist from "./StarHist";
import GenrePrefer from "./GenrePrefer";
import ReviewWordCloud from "./ReviewWordCloud";
import { getReviewsByUser } from "lib/api/review";

const MyReport = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [reviewsByUser, setReviewsByUser] = useState([]);
  const [myContent, setMyContent] = useState("");

  useEffect(()=>{
    getReviewDataByUser()
  },[])

  let contentTemp = ""

  const getReviewDataByUser = () => {
    getReviewsByUser(cookies.userData.shortId).then(response => {
      response.data.forEach(item => {
        contentTemp += item.content
      })
      setReviewsByUser(response.data);
      setMyContent(contentTemp);
    })
  }

  return (
    <>
      <div className="mt-4 flex-box-left mb-5">
        <span className="material-symbols-outlined color-icons">
        note
        </span>
        <h1 className="white-xl-font set-inline">My Report</h1>
      </div>
      {
        reviewsByUser.length === 0 ? (
          <>
            <div style={{textAlign:"center"}}>
              <img src={emptyBox} width="300px" className="m-5"/>
            </div>
          </>
        ) : (
          <>
            {/* <h1 className="white-xl-font mb-5">My Report</h1> */}

            <div className="report-container mb-5 m-5 line">
              <h1 className="white-big-font mb-5">Star Histogram</h1>
              <StarHist />
            </div>

            <div className="report-container mb-5 m-5 line">
              <h1 className="white-big-font mb-5">Genre Preference</h1>
              <GenrePrefer />
            </div>

            <div className="report-container mb-5 m-5">
              <h1 className="white-big-font mb-5">Review Word Cloud</h1>
              <ReviewWordCloud myContent={myContent} />
            </div>
          </>
        )
      }
      
    </>
  )
}

export default MyReport;