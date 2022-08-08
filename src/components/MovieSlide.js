import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "../components/MovieCard";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
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

const MovieSlide = ({ movie }) => {
  console.log("movie", movie);
  return (
    <div>
      <Carousel
        responsive={responsive}
        autoPlay={movie.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
      >
        {movie.results.map((item) => (
          <MovieCard item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlide;
