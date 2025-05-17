import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
        <p>로딩중...</p>
      </div>
    </div>
  );
};

export default Loader;
