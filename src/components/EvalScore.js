import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  gray: "#a9a9a9",
};

const EvalScore = () => {
  // ---------------------------별점---------------------------
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  return (
    <div>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            style={{ marginRight: 10, cursor: "pointer" }}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.gray
            }
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default EvalScore;
