import React from 'react';
import Header from '../header.jsx';
import Modal from 'react-modal';

import MainDisplayContainer from '../main_display/main_display_container';
import GoogleMap from './map';
import { ReactiveBase, NumberBox } from '@appbaseio/reactivesearch';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bed_params: { min: 1, max: 50},
      bed_min: 1,
      price_params: { min: 0, max: 1000000},
      guest_params: { min: 1, max: 50},
      modalOpen: false
    };
    this.clear = this.clear.bind(this);
    this.apply = this.apply.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  clear() {
    this.setState({ modalOpen: false, bed_min: this.state.bed_params.min });
  }

  apply() {
    this.setState({ modalOpen: false, bed_params: { min: this.state.bed_min} });
    this.updateRooms()
  }

  updateRooms(filter) {
    const beds = this.state.bed_params;
    const prices = this.state.price_params;
    const guest = this.state.guest_params;
    filter["bed_params"] = { min: beds.min ? beds.min : 1, max: beds.max};
    filter["price_params"] = { min: prices.min ? prices.min : 0, max: prices.max};
    filter["guest_params"] = { min: guest.min ? guest.min : 1, max: guest.max};
    this.props.getAllRooms(filter);
  }

  updateBed(field) {
    console.log(field);
    return e => {
      this.setState({
        bed_params: Object.assign(this.state.bed_params, { [field]: e.currentTarget.value})
     });
   };
  }

  updatePrice(field) {
    return e => {
      this.setState({
        price_params: Object.assign(this.state.bed_params, { [field]: e.currentTarget.value})
     });
   };
  }
  updateGuest(field) {
    return e => {
      this.setState({
        guest_params: Object.assign(this.state.bed_params, { [field]: e.currentTarget.value})
     });
   };
  }

  // updateBedTwo(mint) {
  //   return this.setState({
  //       bed_params: Object.assign(this.state.bed_params, { min: mint})
  //    });
  // }

  updateBedTwo(mint) {
    return this.setState({
        bed_min: mint
     });
  }
  searchParameters() {
    const bedMin = this.state.bed_min;
    console.log(bedMin);
    return(
      <div>
        <Header/>

      <div className="search-params-container">
        <ul>
          <li>
            <button className="link" onClick={this.openModal}>
              {bedMin} {bedMin === 1 ? 'Bed' : 'Beds'}
            </button>
            <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={this.clear}
                className="modal-beds"
                overlayClassName="modal-overlay"
                contentLabel="auth_form">
                <ReactiveBase app='bnb' credentials='none'>
                <div className='bed-content'>
                    <NumberBox
                      componentId="NumberBoxSensor"
                      dataField="guests"
                      data={{ label: "Beds", start: 1, end: 50 }}
                      defaultSelected={bedMin}
                      onValueChange={(data)=>{this.updateBedTwo(data);}}
                      />
                    <div className='bed-buttons'>
                      <div className="cancel" onClick={this.clear}>Clear</div>
                      <div className="apply" onClick={this.apply}>Apply</div>
                    </div>
                    </div>
                    </ReactiveBase>
              </Modal>



          </li>
          <li>
            <h2>Number of guests allowed</h2>
            <input
              type="number"
              onChange={this.updateGuest('max')}
              placeholder="Any number of guests"
              min="1"
            />
          </li>
          <li>
            <h2>Max price</h2>
              <input
                type="number"
                onChange={this.updatePrice('max')}
                placeholder="Any price"
                min="0"
              />
          </li>
        </ul>
        <button id="change-bed-number">Update map!</button>
      </div>

      </div>
    );
  }
  // <input
  //   type="number"
  //   onChange={this.updateBed('min')}
  //   placeholder="Any number of beds"
  //   min="1"
  // />

  render() {
    console.log(this.state);
    return(
      <div>
        {this.searchParameters()}
        <div className="rooms-map-main-container">

          <MainDisplayContainer />
          <GoogleMap rooms={this.props.entities}
            updateRooms={this.updateRooms.bind(this)}
            bedParams={this.state.bed_params}/>
        </div>

      </div>

    );
  }
}

//

export default Search;
