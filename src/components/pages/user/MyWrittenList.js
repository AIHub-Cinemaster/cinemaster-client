import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import React, { useState, useRef, useEffect } from "react";
import port from "./../../../components/data/port.json";

const MyWrittenList = (data, props) => {
  const [writtenList, setWrittenList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [reviewData, setReviewData] = useState([]);

  const getReviewData = () => {
    // return await axios.get(port.url + `/reviewlist/${props.id}`)
    try {
      axios.get(port.url + `/reviewlist/${props.id}`).then((res) => {
        console.log("get review", res.data);
        setReviewData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteBtn = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      deleteReview()
        .then((res) => {
          alert(res.data.result);
          getReviewData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const deleteReview = async () => {
    return await axios.post(port.url + "/review/delete", {
      shortId: cookies.userData.shortId,
      movieId: props.id,
    });
  };

  const getWrittenList = async () => {
    let res = await axios.get(
      `${port.url}/review/user/${cookies.userData.shortId}`
    );
    setWrittenList(res.data);
    console.log("data!!!!!!!!!!!!!!!!", res.data);
  };

  useEffect(() => {
    getWrittenList();
  }, []);

  return (
    <div>
      <div>
        {writtenList.map((item, index) => (
          <div className="review-card" key={index}>
            <div>{item.movieId}</div>
            <div className="review-content">{item.title}</div>
            <div className="review-content">
              <span className="star">
                ★★★★★
                <span style={{ width: `${Number(item.star) * 10 * 2}%` }}>
                  ★★★★★
                </span>
              </span>
              <span>{item.star}</span>
            </div>
            <div className="review-content">{item.content}</div>
            <div className="review-content">{item.author}</div>
            <>
              <div>
                <p>{item.createdAt}</p>

                <button
                  type="button"
                  onClick={() => {
                    onClickDeleteBtn();
                  }}
                >
                  삭제
                </button>
              </div>
            </>
          </div>
        ))}
      </div>
      <div>작성</div>
      <div>작성</div>
      <div>작성</div>
    </div>
  );
};

export default MyWrittenList;
