import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './front_footer.jsx';

class Front extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    document.getElementsByClassName("front-video")[0].play();
    localStorage.clear();
  }

  render() {
    return(
      <section className="front-page">
        <div className="front-page-container">
          <video className="front-video" height="500" width="890" loop>
            <source src="http://res.cloudinary.com/dluh2fsyd/video/upload/v1516825950/waves_njc6dg.mp4" type="video/mp4"/>
          </video>
          <div className="front-video-overlay">
            <div className="overlay-header">Island BnB</div>
            <div className="overlay-caption">
              For those that have relaxation on their mind and the sea in their hearts. Explore the world's islands and choose the unique home that you've been dreaming about.
            </div>
            <Link to='/islands/' className="overlay-button">
              Start your adventure now
            </Link>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Front;
