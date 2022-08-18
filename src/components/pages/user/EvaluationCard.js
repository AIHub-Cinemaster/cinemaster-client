import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { useCookies } from "react-cookie";

const API_KEY = "637131b35fda1dc6c125beada1dd5b9d";

const IMAGE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
//const IMAGE_URL = "https://img.tmdb.org/t/p/w/200";

// ----------------------별점------------
const EvaluationCard = ({ movieId, movieListTemp }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const getMovieInfoByMovieId = (movie_id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovieInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieInfoByMovieId(movieId);
  }, []);

  const [form, setForm] = useState({
    movieId: movieId,
    star: 0,
  });
  

  const onChangeForm = (event) => {
    // value 값에 따라 별 색칠
    if (event.target.name === "star" ) {
      $(`.star span`).css({ width: `${event.target.value * 10 * 2}%` });
    }
    setForm({
    ...form,
      [event.target.name]:event.target.value
    })
    movieListTemp.push(form)
  };

  var movieListTemp = []

  useEffect(() => {
    console.log(form);
    console.log("movieListTemp", movieListTemp);

  }, [form]);

  return (
    <div className="eval-card hover1">
      <div className="eval-imgBox">
        <img
          src={`${IMAGE_URL}${movieInfo.poster_path}`}
          //src={`https://www.themoviedb.org/t/p/w220_and_h330_face/q54qEgagGOYCq5D1903eBVMNkbo.jpg`}
        />
      </div>
      <div className="eval-intro">
        <h1 className="white-big-font">{movieInfo.id}</h1>
        <p className="grey-small-font">{movieInfo.vote_arerage}</p>
        <span>
          <span className="star">
            ★★★★★
            <span>★★★★★</span>{" "}
            <input
              name='star'
              type="range"
              step=".5"
              min="0"
              max="5"
              onChange={onChangeForm}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default EvaluationCard;
