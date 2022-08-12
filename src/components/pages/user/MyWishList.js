/* Read!!!!!
https://developers.themoviedb.org/3/movies/get-movie-images
위 API 사용하여 영화 이미지 불러오려했으나 빈값만 전달해줌

아래가 예시 
https://api.themoviedb.org/3/movie/616037/images?api_key=637131b35fda1dc6c125beada1dd5b9d&language=en-US
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from './../../data/port.json'

const API_KEY = process.env.REACT_APP_API_KEY;


const MyWishList = ({wishList})=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(()=>{
    wishList.map((item)=>{
      getMovieImage(item).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    })
  },[])


  const getMovieImage = async (movie_id)=>{
    return await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}&language=en-US`)
  }

  return(
    <>
      <h1>위시리스트</h1>
      {
        wishList.map((item, index)=>(
          <p key={index}>movieId: {item}</p>
        ))
      }
    </>
  )



}

export default MyWishList;