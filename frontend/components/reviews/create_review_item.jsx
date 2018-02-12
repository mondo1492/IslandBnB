import React from 'react';
import Modal from 'react-modal';
import merge from 'lodash/merge';
import ReactStars from 'react-stars';

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      signIn: false,
      review: {
        rating: 0,
        body: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = merge(
      {}, {review: this.state.review},
      {review: {reviewer_name: this.props.reviewerName, room_id: this.props.roomId}}
    );
    this.props.addReview(review);
  }

  update(field) {
    return e => {
      this.setState({
        review: Object.assign(this.state.review, { [field]: e.currentTarget.value})
     });
   };
  }

  updateStarCount(rating) {
      this.setState({
        review: Object.assign(this.state.review, { 'rating': rating})
     });
  }

  render() {
    return(
      <div className="review-container">
        <span className='review-modal-header'>Leave a review</span>
        <div>
          <span className="review-modal-sub-header">Stars</span>
            <ReactStars
              className="react-stars-review"
              count={5} size={34} value={this.state.review.rating}
              onChange={(rating)=>{this.updateStarCount(rating)}} />
        </div>
        <div>
          <span className="review-modal-sub-header">Comments</span>
            <textarea
                value={this.state.body}
                onChange={this.update('body')}
                placeholder="Add your comments!"
              />
        </div>
        <button onClick={this.handleSubmit}>Add Review</button>
      </div>
    );
  }
}
export default ReviewItem;
