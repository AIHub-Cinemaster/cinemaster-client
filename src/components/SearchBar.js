import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { movieAction } from "../redux/actions/MovieAction";
import React, { useEffect, useState } from "react";
import $ from "jquery";


const SearchBar = () => {
  const dispatch = useDispatch();
  const { allMovies, loading } = useSelector((state) => state.allMovie);

  useEffect(() => {
    dispatch(movieAction.getAllMovies());
  }, []);

  const handleOnSelect = (item) => {
    let selectMovie = '#' + item.id;
    $(selectMovie).click()
  };

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
    </>
  );
};

export default SearchBar;
