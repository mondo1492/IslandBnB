import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onFrontPage: true
    }
  }

  componentDidMount() {
    this.setState({ onFrontPage: this.props.onFrontPage})
  }

  render() {
    const { onFrontPage } = this.state;
    return(
      <div className={onFrontPage ? 'footer' : 'footer-alt'}>
        <div className='links'>
          <a href="https://github.com/mondo1492" target="_blank" className='github'>
            Github
          </a>
          <div>|</div>
            <a href="https://aaronmondshine.com" target="_blank" className='personal-site'>
              Personal Site
            </a>
          <div>|</div>
          <a href="https://www.linkedin.com/in/aaron-mondshine/" target="_blank" className='linked-in'>
            LinkedIn
          </a>
          <div>|</div>
          <a href="mailto:aaron.mondshine@gmail.com?Subject=Contact%20From%20IslandBnB" target="_top">
            Contact
          </a>
        </div>
        <a href="https://aaronmondshine.com" target="_blank" className='creator'>
          Created by Aaron Mondshine
        </a>
      </div>
    );
  }
}

export default Footer;
