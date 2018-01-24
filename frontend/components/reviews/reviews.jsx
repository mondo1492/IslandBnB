import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AddReviewModal from './create_review';
import ReactStars from 'react-stars';
import strftime from "strftime";

class RoomReviews extends React.Component {
  constructor(props){
    super(props);
    this.state = { reviews: [] };
  }

  componentWillMount() {
    this.props.viewReviews(this.props.match.params.id);
    this.allReviews = this.allReviews.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   this.props.addReview(e.currentTarget.value).then(
  //     () => this.setState(
  //       { reviews: this.props.viewReviews(this.props.currentUser.id) }
  //   ));
  // }

  formatDate(date) {
    return strftime('%B %d, %Y', new Date(date));
  }

  allReviews() {


    return(
      <ul className="index-list">
        {this.props.reviews.reverse().map((review, i) =>(
          <li className="review-index-item" key={review.id}>
            <div className="top-of-review">
              <img src="http://res.cloudinary.com/dluh2fsyd/image/upload/v1501181760/reviewer_iyelfn.png"></img>
              <div className="review-details">
                <span>{review.reviewer_name ? review.reviewer_name : "" }</span>
                <span>{review.created_at ? this.formatDate(review.created_at) : "" }</span>
                  <ReactStars
                    className="react-stars"
                    count={5} size={15} color2={'#00BEC5'}
                    value={review.rating ? review.rating : ""} edit={false} />
                </div>
              </div>
              <div>

            </div>
            <div className="bottom-of-review">
              {review.body ? review.body : "" }
            </div>
          </li>
        ))}
      </ul>
    );
  }

  addButton() {
    const reviewerName = this.props.currentUser.username;
    const roomId = this.props.match.params.id;
    return(
      <div>
        <AddReviewModal reviewerName={reviewerName} roomId= {roomId} addReview= {this.props.addReview}/>
      </div>

    );
  }

  reviewLogic() {
    let tot = 0;
    let sumStars = 0;
    this.props.reviews.forEach( review => {
      sumStars += review.rating;
      tot += 1;
    });
    return (sumStars / tot);
  }

  render() {
    const displayAllReviews = this.allReviews();
    const displayAddButton = this.props.currentUser ? this.addButton() : "";
    const reviewCount = this.props.reviews.length;
    const reviewCountDisplayText = reviewCount === 1 ? `${reviewCount} Review` : `${reviewCount} Reviews`;
    const ratingLogic = this.reviewLogic();
    return(
      <div className="show-page-reviews">
        <div className="review-header">
          <h2>{reviewCountDisplayText}</h2>
          <ReactStars className="react-stars" count={5} size={30} color2={'#00BEC5'} value={ratingLogic} edit={false} />
          {displayAddButton}
        </div>
        {displayAllReviews}
      </div>
    );
  }
}

export default withRouter(RoomReviews);
