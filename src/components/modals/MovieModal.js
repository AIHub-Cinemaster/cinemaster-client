import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import apiKey from "./../../data/apiKey.json"
import axios from "axios";
import MovieRecommendations from "./contents/MovieRecommendations"
import "./../../assets/css/modal.css"

Modal.setAppElement('#root')

const customStyles = {
  content: {
    width:"1280px",
    backgroundColor:"black",
    color:"white",
    marginLeft: 'auto',
    marginRight: 'auto',
    // transform: 'translate(-10%, -10%)',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    padding: '0px'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const MovieModal = ({ isOpen, setOpen, data }) => {
  const [trailerKey,setTrailerKey] = useState("")

  const TMDB_API_KEY = apiKey.TMDB_API_KEY

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`).then(res=>{
      res.data.results.map((item)=>{
        if(item.type == "Trailer"){
          setTrailerKey(item.key)
        }
      })
    }).catch(err=>{console.log(err)})
  },[])




  let youtubeUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}` 

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)} style={customStyles}>
      <iframe 
          style={{width:"1280px", height:"720px", border:"none"}} 
          src={youtubeUrl} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen 
        />
        <div style={{margin:"0px 30px 30px 30px", position:"relative", bottom:"210px"}}>
          <h1 style={{fontSize:"54px"}}><strong>{data.title}</strong></h1>
          <p>{data.overview}</p>
        </div>
        <div style={{marginLeft:"30px"}}>
          {/* <MovieRecommendations id={data.id} /> */}
        </div>
    </Modal>
  );
};

export default MovieModal;