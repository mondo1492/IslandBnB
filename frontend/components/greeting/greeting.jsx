import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_forms_container';

class Greeting extends React.Component {
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

  openModal() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false});
    if (this.props.errors.length >= 1) {
      this.props.resetErrors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.onModalClose();
    }
  }

  newSessionLinks() {
    return (
      <nav>
          <button className="link" onClick={this.handleClick}>
            <h4>Help</h4>
          </button>

          <button className="link" onClick={this.handleClick.bind(this, false)}>
            <h4>Sign Up</h4>
          </button>

          <button className="link" onClick={this.handleClick.bind(this, true)}>
            <h4>Log In</h4>
          </button>
      </nav>
    );
  }
  currentSession(currentUser, logout, resetErrors) {
    return (
      <nav>
        <button className="link" onClick={this.handleClick}>
          <h4>Help</h4>
        </button>

        <div className="dropdown">
          <button className="dropbtn" data-toggle="dropdown-toggle">
            <img src="http://res.cloudinary.com/dluh2fsyd/image/upload/v1500516308/users_oq566g.svg" height="30" width="30"></img>
          </button>
          <div className="dropdown-content">
            <ul className="dropdown-menu">
              <li>
                <Link to='/trips'>View your trips</Link>
              </li>
              <li >
                <Link to={`/listings/${currentUser.id}`}>View your listings</Link>
              </li>
              <li>
                <Link to='/create'>Add a new listing</Link>
              </li>
              <li>
                <Link
                  to={"/islands"}
                  id="last-item"
                  className="header-button"
                  onClick={resetErrors, logout}>Log out
                </Link>
              </li>
            </ul>

          </div>
        </div>

      </nav>
    );
  }

  switchType() {
    if (this.state.signIn) {
      return (
        <div className="switch" >
          <h4>Don't have an account?</h4>
          <input
            type="submit"
            onClick={this.handleClick.bind(this, false)}
            value={"Sign up"}>
          </input>
        </div>
      );
    } else {
      return (
        <div className="switch">
          <h4>Already have an Spacebnb account?</h4>
          <input
            type="submit"
            onClick={this.handleClick.bind(this, true)}
            value={"Log in"}>
          </input>
        </div>
      );
    }
  }

  render() {
    const { currentUser, logout, resetErrors } = this.props;
    const leftDisplay = currentUser ? this.currentSession(currentUser, logout, resetErrors) : this.newSessionLinks();
    const form = (this.state.signIn) ? <SessionFormContainer formType={"login"}/> : <SessionFormContainer formType={"signup"}/>;
    const switchType = this.switchType();
    return(
      <section className="header">
        <div className="left-header-group">
            <a href="/">
            <img
              src="http://res.cloudinary.com/dluh2fsyd/image/upload/v1500430834/rocketLogo_ap6uiz.svg"
              height="40" width="40">
            </img>
          </a>
          { this.props.location.pathname === "/islands/" ?
            <div>
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" className='magnifying-glass'>
            <path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2
              8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6
              3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7
              2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5
              5c .3.3.8.3 1.1 0s .4-.8.1-1.1" fillRule="evenodd">
            </path>
          </svg>

            <input id="searchTextFieldHome"
              type="text"
              name="search"
              placeholder="Destination, city, country">
            </input>
            </div>: ""
          }
        </div>
        <div className="right-header-group">
          { leftDisplay }
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.onModalClose}
            className="modal"
            overlayClassName="modal-overlay"
            contentLabel="auth_form">
            <button className="X" onClick={this.onModalClose}>&times;</button>
            {form}
            {switchType}
          </Modal>
        </div>
      </section>
    );
  }
}

export default Greeting;
// add after get everything else done
// <input id="searchTextFieldHome"
//   type="text"
//   name="search"
//   placeholder="Search by location...."></input>
