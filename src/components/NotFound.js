import React from "react";

function NotFound() {
  return (
    <div className="center">
      <div className="not-found">
        <h2>404!</h2>
        <img src="/Sad-cat.jpeg" alt="sad cat" className="sad-cat" />
        <p>The kitties couldn't locate that particular page</p>
      </div>
    </div>
  );
}

export default NotFound;
