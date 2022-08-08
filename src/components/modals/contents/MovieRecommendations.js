import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import apiKey from "./../../../data/apiKey.json"
import axios from "axios";
import MovieCard from '../../MovieCard';


// const getPosterURL = (posterpath)=>{
//   return `https://www.themoviedb.org/t/p/w220_and_h330_face/${posterpath}`
// }


const MovieRecommendations = (props)=>{
  const [rcmdMovies, setRcmdMovies] = useState([])

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`).then(res=>{
      console.log(res.data.results);
      setRcmdMovies(res.data.results)
    }).catch(err=>{console.log(err)})
  },[])


  const TMDB_API_KEY = apiKey.TMDB_API_KEY

  return (
    <div>
      {
        rcmdMovies.map((movie, index)=>{
          return <MovieCard key={index} {...movie} />
        })
      }
    </div>
  )
}
export default MovieRecommendations;