import React, { useEffect, useState } from "react";
import EvaluationCard from "./pages/user/EvaluationCard";
import { useCookies } from "react-cookie";

const Evaluation = () => {
  const [isLoading, setIsLoding] = useState(true);
  const [movies, setMovies] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [myForm, setMyForm] = useState({
    shortId: cookies.userData.shortId,
    movieList: [],
  });

  const movieIds = [
    238, 616037, 129, 766507, 616037, 507086, 438148, 361743, 585511, 756999,
    718789, 453395, 725201, 919355, 634649, 614934, 961484, 924482, 759175,
    675353, 854467, 610150, 728366,
  ];

  return (
    <div>
      {movieIds.map((movieId, index) => (
        <EvaluationCard key={index} movieId={movieId} />
      ))}
    </div>
  );
};

export default Evaluation;
// ==============================================================================================

// const Evaluation = ({ movieId }) => {
//   //1. 서버 API 호출

//   const movie_Data = () =>
//     axios
//       .get(`${port.url}/eval/20`)
//       .then((Response) => {
//         console.log(Response.data.result);

//       })
//       .catch((Error) => {
//         console.log(Error);
//       });

//   const words = movie_Data();

// console.log(words);
// const names = city.map((city) => city.name);

// movieId.forEach((number) => console.log(number));

// const getDummy = async (numbers) => {
//   let url = `https://api.themoviedb.org/3/movie/${numbers}?api_key=${API_KEY}&language=en-US`;
//   let response = await fetch(url);
//   let data = await response.json;
//   console.log(data);
// };
