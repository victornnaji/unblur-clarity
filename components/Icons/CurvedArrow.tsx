import React from "react";

const CurvedArrow = () => {
  return (
    <svg
      className="w-full h-auto"
      viewBox="0 0 121 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotateY(0deg)" }}
    >
      <path
        d="M81.3062 14.9453L119.241 35.8597C119.241 35.8597 98.5269 51.9726 83.4618 58.7151"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDashoffset: 0, strokeDasharray: "none" }}
      ></path>
      <path
        d="M15.846 106.943C10.38 54.5943 48.924 32.421 118.215 36.192"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDashoffset: 0, strokeDasharray: "none" }}
      ></path>
    </svg>
  );
};

export default CurvedArrow;
