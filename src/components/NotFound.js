import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="center">
      <div className="not-found">
        <h2>404!</h2>
        <img src='/Sad-cat.jpeg' alt='sad cat' className='sad-cat'/>
        <p>The cats couldn't locate that particular page</p>
        <Link to="/" />
        <button className='notfound-btn'>
          Go Home
          </button>
        <Link />
      </div>
    </div>
  );
}

export default NotFound;
