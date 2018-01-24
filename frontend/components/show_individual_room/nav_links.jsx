import React from 'react';
import { Link } from 'react-router-dom';
const navLinks = () => {
  return(
    <div className="show-page-nav-links">
      <ul>
        <li>
          <a href="#overview">Overview</a>
        </li>
        <li className="dot">
          <h4>·</h4>
        </li>
        <li>
          <a name="reviews">Reviews</a>
        </li>
        <li className="dot">
          <h4>·</h4>
        </li>
        <li>
          <a name="host">The Host</a>
        </li>
        <li className="dot">
          <h4>·</h4>
        </li>
        <li>
          <a name="location">Location</a>
        </li>
      </ul>
    </div>
  );
};

export default navLinks;
