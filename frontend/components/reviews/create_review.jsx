import React from 'react';
import Modal from 'react-modal';
import CreateReviewItem from './create_review_item';

class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      signIn: false
    };
    this.onModalClose = this.onModalClose.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleClick(bool) {
    this.setState({
      modalOpen: true,
      signIn: bool
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rating !== "" && nextProps.body !== "") {
      this.onModalClose();
    }
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    const {reviewerName, roomId} = this.props;
    return(
      <div className="review-button-main">
        <button id="review-button-main2"onClick={this.openModal}>Review this room!</button>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.onModalClose}
            className="modal"
            overlayClassName="modal-overlay"
            contentLabel="add-review"
            >
            <button className="X" onClick={this.onModalClose}>&times;</button>
            <CreateReviewItem reviewerName={reviewerName} roomId={roomId} addReview={this.props.addReview}/>
          </Modal>
      </div>

    );
  }
}
export default AddReviewModal;
//to fill out to make code cleaner
