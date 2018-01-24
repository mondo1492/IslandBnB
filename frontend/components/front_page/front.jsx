import React from 'react';
import { Link } from 'react-router-dom';
// import Modal from 'react-modal';
// import SessionFormContainer from '../session/session_forms_container';

class Front extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementsByClassName("front-video")[0].play();
  }


  render() {
    return(
      <section className="front-page">
        <div className="front-page-container">
          <video className="front-video" height="500" loop>
            <source src="http://res.cloudinary.com/dluh2fsyd/video/upload/v1516825950/waves_njc6dg.mp4" type="video/mp4"/>
          </video>
          <div className="front-video-overlay">
            <div className="front-page-header">
              <h2>Island BnB</h2>
            </div>
            <div className="front-page-header">
              <h3>Because a real getaway is surrounded by the sea</h3>
            </div>
            <div className="front-page-button">
              <button>Start your voyage now</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Front;
