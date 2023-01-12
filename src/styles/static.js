export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const responsiveforRank = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const customStyles = {
  content: {
    width: "850px",
    backgroundColor: "rgba(24, 24, 24, 1)",
    // background: "linear-gradient(to bottom, black 40%, #242424 90%)",
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    // transform: 'translate(-10%, -10%)',
    border: "none",
    borderRadius: "20px",
    outline: "none",
    padding: "0px",
    boxShadow: "0 6px 500px rgb(0 0 0 / 60%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(051, 051, 051, 0.5)",
    backdropFilter: "blur(7px)",
    zIndex: 2,
  },
};