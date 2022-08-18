import React, { useEffect, useState } from "react";
import EvaluationCard from "./pages/user/EvaluationCard";
import { useCookies } from "react-cookie";
import axios from "axios";

const Evaluation = () => {
  

  const [movieIds, setMovieIds] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [myForms, setMyForms] = useState({
    shortId: cookies.userData.shortId,
    movieList: [],
  });

  const getRandomIds = ()=>{
    axios.get(process.env.REACT_APP_SERVER_URL + '/eval/20').then(res=>{
      setMovieIds(res.data.result)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getRandomIds();
  },[])

  var movieListTemp = []

  return (
    <div>
      {
        movieIds.length === 0 ? (
          <></>
        ) : (
          <>
            {
              movieIds.map((movieId, index) => (
                <EvaluationCard key={index} movieId={movieId} movieListTemp={movieListTemp}/>
              ))
            }
          </>
        )
        
      }
    </div>
  );
};

export default Evaluation;

