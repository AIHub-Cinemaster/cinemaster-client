import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getCart, setCart } from 'lib/api/cart';

interface IProps {
  movieId: string;
}
const BookMark = ({ movieId }: IProps) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  const [inCart, setInCart] = useState('');

  useEffect(() => {
    if (cookies.userData) {
      initCart(); //장바구니 서버에서 가져오기
    }
  }, [movieId]);

  const initCart = () => {
    getCart(cookies.userData.shortId).then((response) => {
      setInCart(response.data.result.includes(String(movieId)));
    });
  };

  const onClickBookMark = () => {
    if (!cookies.userData) {
      navigate('/login');
      return;
    }
    setCart(cookies.userData.shortId, movieId).then((response) => {
      setInCart(response.data.bookmark);
    });
  };

  return (
    <>
      <div className="bookmark-area ">
        {inCart ? (
          // 내목록안에 담겨있으면 눌렀을 떄, 장바구니 취소
          <>
            <span
              className="material-icons color-icons"
              onClick={onClickBookMark}
            >
              bookmark
            </span>
          </>
        ) : (
          // 내목록안에 없으면 눌렀을 떄, 장바구니 담기
          <>
            <span
              className="material-icons grey-icons"
              onClick={onClickBookMark}
            >
              bookmark
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default BookMark;
