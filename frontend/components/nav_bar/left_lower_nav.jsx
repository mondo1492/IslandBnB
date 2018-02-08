import React from 'react';
import { Link } from 'react-router-dom';
const LeftLowerNav = () => {
  return(
    <nav className="left-lower-nav">
      <Link to='/'>
      <button autoFocus={true}>
        HOMES
      </button>
      </Link>
    </nav>
  );
};

export default LeftLowerNav;


//need to decide to include this or not in later rendition
