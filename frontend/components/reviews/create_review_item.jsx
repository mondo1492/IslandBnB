import React from 'react';
import Modal from 'react-modal';
import merge from 'lodash/merge';

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      signIn: false,
      review: {
        rating: "",
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

  updateList(field) {
    return e => {
      this.setState({
        review: Object.assign(this.state.review, { [field]: e.target.value})
     });
   };
  }

  render() {
    return(
      <div className="review-container">
        <div>
          <h3 id="review-body">Rate your experience!</h3>
            <textarea
                value={this.state.body}
                onChange={this.update('body')}
                placeholder="Add your review!"
              />
        </div>
        <div>
        <h3 id="review-rating">Stars</h3>
          <select onChange={this.updateList('rating')}>
            <option value="" hidden >Stars</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button onClick={this.handleSubmit}>Add Review</button>
      </div>
    );
  }
}
export default ReviewItem;
//to fill out to make code cleaner
