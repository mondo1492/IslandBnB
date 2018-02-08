import React from 'react';
import merge from 'lodash/merge';
import { Redirect, Route,Link, withRouter } from 'react-router-dom';
import Header from '../header.jsx';
import Footer from '../front_page/front_footer.jsx';
import Select from 'react-select';
import Modal from 'react-modal';
import GeoLocation from './geo_location';

import DropForm from './image_drop';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        room: {
          title: "",
          description: "",
          address: "",
          lng: null,
          lat: null,
          host_id: null,
          price: "",
          prop_type: "",
          room_type: 'Entire place',
          num_guests: 1,
          bedrooms: 1,
          beds: 1,
          pic_url: ""
        },
        id: null,
        editing: false,
        modalOpen: false
      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNumbers = this.renderNumbers.bind(this);
    this.updatePicUrl = this.updatePicUrl.bind(this);
    this.updateGeoLocation = this.updateGeoLocation.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const room = nextProps.savedInfo;
    if (room) {
      this.setState({
        room: {
          title: room.title,
          description: room.description,
          address: room.address,
          lng: room.lng,
          lat: room.lat,
          host_id: room.host_id,
          price: room.price,
          prop_type: room.prop_type,
          room_type: room.room_type,
          num_guests: room.num_guests,
          bedrooms: room.bedrooms,
          beds: room.beds,
          pic_url: room.pic_url
        },
        id: room.id,
        editing: nextProps.editing
      });
    }
    if (nextProps.errors.length > 0) {
      this.setState({modalOpen: true})
    }
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editing) {
      const editRoom = merge(
        {}, {room: this.state.room},
        {room: {id: this.state.id, host_id: this.props.currentUser.id }}
      );
      this.props.editRoom(editRoom).then(
          (data) => this.props.history.push(`/listings/${this.props.currentUser.id}`)
      )
    } else {
      const createRoom = merge(
        {}, {room: this.state.room},
        {room: {host_id: this.props.currentUser.id }}
      );
      this.props.createRoom(createRoom).then(
        (data) => this.props.history.push(`/listings/${this.props.currentUser.id}`)
      );
    }
  }

  update(field) {
    return e => {
      this.setState({
        room: Object.assign(this.state.room, { [field]: e.currentTarget.value})
     });
   };
  }

  updateList(field) {
    return e => {
      this.setState({
        room: Object.assign(this.state.room, { [field]: e.target.value})
     });
   };
  }

  prettyErrors() {
    let prettyErrors = []
    this.props.errors.forEach(error=>{
      if (error === "Prop type can't be blank") {
        prettyErrors.push("Property Type")
      } else if (error === "Pic url can't be blank") {
        prettyErrors.push("Picture")
      } else if (error !== "Lng can't be blank" &&
                 error !== "Lat can't be blank") {
        prettyErrors.push(`${error.split(" ")[0]}`);
      }
    });
    return prettyErrors;
  }

  renderErrors() {
    return (
      <div>
        <h2>Oops!</h2>
        <h3>Looks like you left out some important information:</h3>
        <ul>
          <li className='ul-title'>A listing requires the following:</li>
          <ul>
            {this.prettyErrors().map((error, i) => (
              <li key={`error-${i}`}>
                {error}
              </li>
            ))}
          </ul>
        </ul>
    </div>
    );
  }

  renderNumbers(val, name) {
    let count = [];
    let value = `${val}`;
      for (var i = 2; i < 31; i++) {
        count.push(
        <option
          key={i}
          onChange={this.update(val)}
          value={i}>{i} {name}
        </option>
        );
      }
    return count;
  }

  updatePicUrl(url) {
    this.setState({
      room: Object.assign(this.state.room, { pic_url: url})
    });
  }

  updateGeoLocation({lat, lng, address}) {
    console.log(lat, lng, address);
    this.setState({
      room: Object.assign(this.state.room, { lat: lat, lng: lng, address: address})
    });
  }

  render() {
    return (
      <div>
        <Header/>
          <div className='trips-header'>
            <span id='trips-header-title'>Create a listing</span>
            <span id='trips-header-desc'>Fill out all the fields below</span>
          </div>
          <div className="new-room-form-container">
            <div className="new-room-form-box">
              <div className="new-room-form">
                <h2 id="form-title">What kind of place are you listing?</h2>
                <h3 id="sub-form-title">What type of property is this?</h3>
                  <select value={this.state.room.prop_type} onChange={this.updateList('prop_type')} >
                    <option value="" hidden >Select one</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Guesthouse">Guesthouse</option>
                    <option value="House">House</option>
                    <option value="Hotel">Hotel</option>
                    <option value="In-law">In-law</option>
                    <option value="Guest suite">Guest suite</option>
                    <option value="Townhosue">Townhosue</option>
                    <option value="Vacation home">Vacation home</option>
                    <option value="none" disabled>───────────────────</option>
                    <option value="Boat">Boat</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Cabin">Cabin</option>
                    <option value="Castle">Castle</option>
                    <option value="Cave">Cave</option>
                    <option value="Chalet">Chalet</option>
                    <option value="Dorm">Dorm</option>
                    <option value="Earth House">Earth House</option>
                    <option value="Igloo">Igloo</option>
                    <option value="Island">Island</option>
                    <option value="Lighthouse">Lighthouse</option>
                    <option value="Plane">Plane</option>
                    <option value="Camper">Camper/RV</option>
                    <option value="Tent">Tent</option>
                    <option value="Tipi">Tipi</option>
                    <option value="Train">Train</option>
                    <option value="Treehouse">Treehouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Yurt">Yurt</option>
                  </select>

                  <div className="padder"></div>

                  <h3 id="sub-form-title">What will guests have?</h3>
                  <select value={this.state.room.room_type} onChange={this.updateList('room_type')} >
                    <option value='Entire place'>Entire place</option>
                    <option value='Private room'>Private room</option>
                    <option value='Shared room'>Shared room</option>
                  </select>

                  <div className="padder"></div>

                  <h2 id="form-title">How many guests can your place accommodate?</h2>
                  <select value={this.state.room.num_guests} onChange={this.updateList('num_guests')}>
                    <option value={1} >1 guest</option>
                    {this.renderNumbers('num_guests','guests')}
                  </select>

                  <div className="padder"></div>

                  <h3 id="sub-form-title">How many bedrooms can guests use?</h3>
                  <select value={this.state.room.bedrooms} onChange={this.updateList('bedrooms')}>
                    <option value={0} >Studio</option>
                    <option value={1}>1 bedroom</option>
                    {this.renderNumbers('bedrooms','bedrooms')}
                  </select>

                  <div className="padder"></div>

                  <h3 id="sub-form-title">How many beds can guests use?</h3>
                  <select value={this.state.room.beds} onChange={this.updateList('beds')}>
                    <option value={1}>1 bed</option>
                    {this.renderNumbers('beds','beds')}
                  </select>

                  <div className="padder"></div>

                  <h3 id="sub-form-title">Where’s your place located?</h3>
                    <input
                      id="searchTextField"
                      type="text"
                      placeholder={this.state.room.address === "" ?  "Address" : this.state.room.address}
                    />
                  <h2 id="form-title">Show travelers what your space looks like</h2>

                  <DropForm className="drop-form" updateUrl={this.updatePicUrl}/>

                  <div className="padder"></div>

                  <h2 id="form-title">Edit your description</h2>
                  <h3 id="sub-form-title">Summary</h3>
                    <textarea
                        value={this.state.room.description}
                        onChange={this.update('description')}
                        placeholder="Description..."
                      />
                    <div className="padder"></div>

                    <h2 id="form-title">Name your place</h2>
                    <input
                      type="text"
                      value={this.state.room.title}
                      onChange={this.update('title')}
                      placeholder="Title"
                    />
                  <div className="padder"></div>

                  <h2 id="form-title">Set your daily rate</h2>
                    <input
                      type="number"
                      value={this.state.room.price}
                      onChange={this.update('price')}
                      placeholder="Daily rate"
                    >

                  </input>

                  <div className="padder"></div>

                <button onClick={this.handleSubmit}>Finish</button>
                <Modal
                  isOpen={this.state.modalOpen}
                  onRequestClose={this.onModalClose}
                  className="modal help-modal"
                  overlayClassName="modal-overlay"
                  contentLabel="error-modal">
                  <button className="X" onClick={this.onModalClose}>&times;</button>
                  {this.renderErrors()}
                </Modal>

                </div>
                <div className="map-container">
                  <GeoLocation updateGeoLocation={this.updateGeoLocation} lng={this.state.room.lng} lat={this.state.room.lat}/>
                </div>
              </div>
          </div>
        <Footer/>
      </div>

    );
  }
}

export default withRouter(CreateRoom);
