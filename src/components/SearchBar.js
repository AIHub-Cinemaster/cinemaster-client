import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { movieAction } from "../redux/actions/MovieAction";
import MovieModal from "./modals/MovieModal";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { allMovies, loading } = useSelector((state) => state.allMovie);
  const [isOpen, setOpen] = useState(false);
  const [selId, setSelId] = useState("");

  useEffect(() => {
    dispatch(movieAction.getAllMovies());
  }, []);

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setSelId(item.id);
    setOpen(true);
  };

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //   // the item hovered
  //   console.log(result);
  // };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  const formatResult = (item) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
          style={{
            width: "50px",
          }}
        />
        <ul
          style={{
            fontSize: "20px",
            fontFamily: "Archivo",
            marginLeft: "20px",
          }}
        >
          <li>{item.title}</li>
          <li>★ {item.vote_average / 2}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="search-div" style={{ width: 400 }}>
        <ReactSearchAutocomplete
          // onSearch={handleOnSearch}
          // onHover={handleOnHover}
          // onFocus={handleOnFocus}
          items={allMovies}
          onSelect={handleOnSelect}
          autoFocus
          formatResult={formatResult}
          showIcon={true}
          maxResults={7}
          showNoResults={false}
          fuseOptions={{ keys: ["title"] }}
          placeholder={"Please enter the movie title."}
        />
      </div>
      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={selId} />
    </>
  );
};

export default SearchBar;
