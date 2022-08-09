import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from "axios";
import GetRecommendations from "./contents/GetRecommendations"
import GetSimilarMovies from './contents/GetSimilarMovies';
import "./../../assets/css/modal.css"
const API_KEY = process.env.REACT_APP_API_KEY;

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
    backgroundColor: 'rgba(051, 051, 051, 0.5)'
  }
};

const MovieModal = ({ isOpen, setOpen, data }) => {
  const [trailerKey,setTrailerKey] = useState("")

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
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
        <div style={{margin:"0px 30px 30px 30px"}}>
          <h1 style={{fontSize:"54px", position:"relative", bottom:"120px"}}><strong>{data.title}</strong></h1>
          <p style={{marginBottom:"50px"}}>{data.overview}</p>

          <h1 style={{marginTop:"30px"}}><strong>Recommendations</strong></h1>
          <GetRecommendations id={data.id} />

          <h1 style={{marginTop:"30px"}}><strong>Similar Movies</strong></h1>
          <GetSimilarMovies id={data.id} />

          <h1 style={{marginTop:"30px"}}><strong>REVIEW</strong></h1>
        </div>
    </Modal>
  );
};

export default MovieModal;