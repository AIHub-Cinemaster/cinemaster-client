import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import GetRecommendations from "./contents/GetRecommendations";
import GetSimilarMovies from "./contents/GetSimilarMovies";
import "./../../assets/css/modal.css";
import Reviews from "./contents/Reviews";
import heartGrey from "./../../assets/images/heartGrey.png";
import heartRed from "./../../assets/images/heartRed.png";
import port from "./../data/port.json";

const API_KEY = process.env.REACT_APP_API_KEY;

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "850px",
    backgroundColor: "#181818",
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    // transform: 'translate(-10%, -10%)',
    border: "none",
    borderRadius: "20px",
    outline: "none",
    padding: "0px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(051, 051, 051, 0.5)",
  },
};

const MovieModal = ({ isOpen, setOpen, data, isHeart }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [trailerKey, setTrailerKey] = useState("");
  const [inCart, setInCart] = useState(isHeart);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        res.data.results.map((item) => {
          if (item.type == "Trailer") {
            setTrailerKey(item.key);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let youtubeUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`;

  const onClickHeart = () => {
    if (!cookies.userData) {
      alert("로그인 해주세요");
      return;
    }

    if (inCart) {
      // 장바구니 취소
      pullCart()
        .then((res) => {
          setInCart(false);
          // alert(res.data.result);
        })
        .catch((err) => {
          alert(err.response.data.fail);
        });
    } else {
      // 장바구니 담기
      putCart()
        .then((res) => {
          setInCart(true);
          // alert(res.data.result);
        })
        .catch((err) => {
          alert(err.response.data.fail);
        });
    }
  };

  const putCart = async () => {
    return await axios.post(port.url + "/cart/add", {
      shortId: cookies.userData.shortId,
      movieId: data.id,
    });
  };
  const pullCart = async () => {
    return await axios.post(port.url + "/cart/delete", {
      shortId: cookies.userData.shortId,
      movieId: data.id,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
    >
      <iframe
        style={{ width: "850px", height: "480px", border: "none" }}
        src={youtubeUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div style={{ margin: "0px 30px 30px 30px" }}>
        <h1 style={{ fontSize: "54px", margin: "20px 0px" }}>
          <strong>{data.title}</strong>
        </h1>
        <p style={{ marginBottom: "50px" }}>{data.overview}</p>
        {inCart ? (
          <>
            <img src={heartRed} onClick={onClickHeart} className="heart" />
          </>
        ) : (
          <>
            <img src={heartGrey} onClick={onClickHeart} className="heart" />
          </>
        )}

        {/* {console.log(isHeart)} */}

        <h1 style={{ marginTop: "30px" }}>
          <strong>Recommendations</strong>
        </h1>
        <GetRecommendations id={data.id} />

        <h1 style={{ marginTop: "30px" }}>
          <strong>Similar Movies</strong>
        </h1>
        <GetSimilarMovies id={data.id} />

        <h1 style={{ marginTop: "30px" }}>
          <strong>REVIEW</strong>
        </h1>
        <Reviews id={data.id} />
      </div>
    </Modal>
  );
};

export default MovieModal;
