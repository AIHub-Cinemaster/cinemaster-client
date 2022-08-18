// App.js

import React, { useState } from "react";
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import { AutoComplete } from "antd";
const { Option } = AutoComplete;

const datas = [
  { value: "삼성전자" },
  { value: "삼성바이오로직스" },
  { value: "LG전자" },
  { value: "LG화학" },
  { value: "DL" },
];

const Search = () => {
  const [result, setResult] = useState([]);
  const handleSearch = (inputValue) => {
    let res = [];
    if (!inputValue) {
      res = [];
    } else {
      res = datas.filter((item) => true === matchName(item.value, inputValue));
    }
    console.log("setResult", res);
    if (res.length > 0) {
      setResult(res);
    }
  };
  const matchName = (name, keyword) => {
    //console.log('matchName', name, keyword);
    if (name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1) {
      console.log("matchName true");
      return true;
    } else {
      console.log("matchName false");
      return false;
    }
  };
  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      {result.map((item) => (
        <Option key={item.value}> {item.value}</Option>
      ))}
    </AutoComplete>
  );
};
export default Search;
