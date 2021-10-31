import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className='center'>
      <div className='user-card'>
      <h2>404!</h2>
      <p>The cats couldn't locate that particular page</p>
      <Link to="/" />
      Go Home
      <Link />
      </div>
    </div>
  );
}

export default NotFound;
