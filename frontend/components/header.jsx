import React from 'react';
import GreetingsContainer from './greeting/greetings_container';
import  LeftLowerNav  from './nav_bar/left_lower_nav';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <header>
        <GreetingsContainer/>
        <div id="header-padder"></div>
        <div id="all-content"></div>
      </header>
    );
  }
}

export default Header;
