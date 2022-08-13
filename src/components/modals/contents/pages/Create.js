import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import $ from "jquery";
import axios from "axios";
import port from './../../../data/port.json'
import { useNavigate } from "react-router-dom";


const Create = ({createIsOpen, setCreateIsOpen, movieId, getReviewData})=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const navigate = useNavigate();


  

  const [createReview, setCreateReview] = useState({
    movieId: movieId,
    title:"",
    content:"",
    shortId:cookies.userData.shortId
  });

  useEffect(()=>{
    console.log(createReview);
  }, [createReview]);

  const onChangeCreateReview = (event)=>{
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value
    });
  }

  const onClickCreateReviewButton = ()=>{
    if(createReview.title === ""){
      alert("title null");
      $("#title").focus();
      return;
    }
    if(createReview.content === ""){
      alert("content null");
      $("#content").focus();
      return;
    }

    sendCreateReview().then(res=>{
      console.log(res);
      alert(res.data.result)
      getReviewData()
      setCreateIsOpen(false)
      // navigate("/review/list")
    }).catch(error=>{
      alert(error.response.data.fail);
    })
  }

  const sendCreateReview = async()=>{
    return await axios.post(port.url + "/review/add", createReview)

  }
  // movieId, email, title, content

  return (
      <div className="review-create-card">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">TITLE</label>
          <input type="text" className="form-control" onChange={onChangeCreateReview} name="title" id="title" placeholder="Title Here"/>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">CONTENT</label>
          <textarea className="form-control" onChange={onChangeCreateReview} name="content" id="content" rows="5" placeholder="Content Here"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Author</label>
          <input type="text" className="form-control" name="name" id="name" placeholder={cookies.userData.name} disabled />
        </div>

        <div style={{textAlign:"right"}}>
          <button type="button" onClick={onClickCreateReviewButton} className="btn btn-danger" style={{marginRight:"7px"}}>SUBMIT</button>
          <button type="button" onClick={()=>{setCreateIsOpen(false)}} className="btn btn-danger">BACK</button>
        </div>      
      </div>
    
  )
}

export default Create;