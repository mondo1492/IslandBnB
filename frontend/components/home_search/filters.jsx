import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { Range } from 'rc-slider';
import { ReactiveBase, NumberBox, RangeSlider } from '@appbaseio/reactivesearch';

class Filters extends React.Component {
  constructor(props){

    const storedBedMin =  parseInt(localStorage.getItem('bed_min'));
    const storedPriceMin = parseInt(localStorage.getItem('price_min'));
    const storedPriceMax = parseInt(localStorage.getItem('price_max'));
    const storedGuestMin = parseInt(localStorage.getItem('guest_min'));
    this.state = {
      bedParams: this.props.state.bedParams,
      bedMin: storedBedMin ? storedBedMin : 0,
      priceParams: { min: storedPriceMin ? storedPriceMin : 0, max: 1000},
      priceMin: storedPriceMin ? storedPriceMin : 0,
      priceMax: storedPriceMax ? storedPriceMax : 1000,
      guestParams: { min: storedGuestMin ? storedGuestMin : 1, max: 50},
      guestMin: storedGuestMin ? storedGuestMin : 1,
      bedModalOpen: false,
      guestModalOpen: false,
      priceModalOpen: false,
    };

    this.clearChange = this.clearChange.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  openModal(modalType) {
    this.setState({ [modalType]: true });
  }

  closeModal(modalType) {
    this.setState({ [modalType]: false });
  }

  clearChange(filterType) {
    switch (filterType) {
      case "bedCount":
        this.setState({ bedMin: 0 })
        break;
      case "guestCount":
        this.setState({ guestMin: 1 })
        break;
      case "priceAmount":
        this.updatePrice([0, 1000]);
        break;
    }
  }

  cancelChange(modalType) {
    this.setState({
      bedMin: this.state.bedParams.min,
      guestMin: this.state.guestParams.min,
      priceMin: this.state.priceParams.min,
      priceMax: this.state.priceParams.max,
    });
    this.closeModal(modalType);
  }

  applyChange(modalType) {
    this.setState({
      bedParams: Object.assign(this.state.bedParams, { min: this.state.bedMin}),
      guestParams: Object.assign(this.state.guestParams, { min: this.state.guestMin }),
      priceParams: Object.assign(this.state.priceParams, { min: this.state.priceMin, max: this.state.priceMax})
    }, () => this.savePresets());
    this.closeModal(modalType);
    this.updateRooms(this.state.bounds);
  }

  updatePrice(price) {
    return this.setState({ priceMin: price[0], priceMax: price[1]});
  }

  updateGuest(min_guests) {
    return this.setState({ guestMin: min_guests });
  }

  updateBed(min_beds) {
    return this.setState({ bedMin: min_beds });
  }

  componentWillUpdate() {
    this.addListeners();
  }


  componentWillUnmount() {
    this.savePresets();
  }

  priceDisplay() {
      if (this.state.priceMin === 0 && this.state.priceMax < 1000) {
        return `Up to $${this.state.priceMax}`;
      } else if (this.state.priceMin > 0 && this.state.priceMax < 1000) {
        return `$${this.state.priceMin} - $${this.state.priceMax}`;
      } else if (this.state.priceMin > 0 && this.state.priceMax === 1000) {
        return `$${this.state.priceMin}+`;
      } else {
        return `Price`;
      }
  }

  filterButtonClass(bool) {
    return bool ? "filter-button" : "filter-button-selected";
  }

  modalButtonClass(bool) {
    return bool ? "cancel-hidden" : "cancel";
  }

  resetFilters() {
    this.setState({
      priceMin: 0,
      priceMax: 1000,
      bedMin: 0,
      guestMin: 1
    }, () => this.savePresets());
  }

render() {
  const bedMin = this.state.bedMin;
  const guestMin = this.state.guestMin;
  const priceMin = this.state.priceMin;
  const priceMax = this.state.priceMax;
  const {min, max} = this.state.priceParams;
  return(
    <div>
    <div className="search-params-container">
      <ul>
        <li>
          <button className={this.filterButtonClass(bedMin === 0)} onClick={()=>this.openModal("bedModalOpen")}>
            <div className="filter-button-text">
              {`${bedMin}+`} {bedMin === 1 ? 'Bed' : 'Beds'}
            </div>
          </button>
          <Modal
              isOpen={this.state.bedModalOpen}
              onRequestClose={() => this.cancelChange("bedModalOpen")}
              className="modal-beds"
              overlayClassName="modal-overlay"
              contentLabel="auth_form">
              <ReactiveBase app='bnb' credentials='none'>
                <div className='bed-content'>
                  <NumberBox
                    componentId="NumberBoxSensor"
                    dataField="guests"
                    data={{ label: "Beds", start: 0, end: 50 }}
                    defaultSelected={bedMin}
                    onValueChange={(data)=>{this.updateBed(data);}}
                    />
                  <div className='bed-buttons'>
                    <div className={this.modalButtonClass(bedMin === 0)} onClick={()=>this.clearChange("bedCount")}>Clear</div>
                    <div className="apply" onClick={()=>this.applyChange("bedModalOpen")}>Apply</div>
                  </div>
                </div>
              </ReactiveBase>
            </Modal>
        </li>
        <li>
          <button className={this.filterButtonClass(guestMin === 1)} onClick={()=>this.openModal("guestModalOpen")}>
            <div className="filter-button-text">
              {guestMin} {guestMin === 1 ? 'Guest' : 'Guests'}
            </div>
          </button>
          <Modal
              isOpen={this.state.guestModalOpen}
              onRequestClose={()=>this.cancelChange("guestModalOpen")}
              className="modal-guests"
              overlayClassName="modal-overlay"
              contentLabel="auth_form">
              <ReactiveBase app='bnb' credentials='none'>
                <div className='bed-content'>
                  <NumberBox
                    componentId="NumberBoxSensor"
                    dataField="guests"
                    data={{ label: "Guests", start: 1, end: 50 }}
                    defaultSelected={guestMin}
                    onValueChange={(data)=>{this.updateGuest(data);}}
                    />
                  <div className='bed-buttons'>
                    <div className={ this.modalButtonClass(guestMin === 1) } onClick={()=>this.clearChange("guestCount")}>Clear</div>
                    <div className="apply" onClick={()=>this.applyChange("guestModalOpen")}>Apply</div>
                  </div>
                </div>
              </ReactiveBase>
            </Modal>
        </li>
        <li>
          <button className={this.filterButtonClass(priceMin === 0 && priceMax === 1000)} onClick={()=>this.openModal("priceModalOpen")}>
            <div className="filter-button-text">
              {this.priceDisplay()}
            </div>
          </button>
          <Modal
              isOpen={this.state.priceModalOpen}
              onRequestClose={()=>this.cancelChange("priceModalOpen")}
              className="modal-price"
              overlayClassName="modal-overlay">
                <div className='modal-price-display'>
                  {`$${priceMin} - $${priceMax === 1000 ? `1000+` : priceMax}`}
                </div>
                <div className='bed-content'>
                <Range
                  min={0}
                  max={1000}
                  className='range-slider'
                  value={[priceMin, priceMax]}
                  tipFormatter={ value => `$${value}`}
                  onChange={(value)=>{this.updatePrice(value)}}
                />
                <div className='bed-buttons'>
                  <div className={ this.modalButtonClass(priceMin === 0 && priceMax === 1000)}  onClick={()=>this.clearChange("priceAmount")}>Clear</div>
                  <div className="apply" onClick={()=>this.applyChange("priceModalOpen")}>Apply</div>
                </div>
              </div>
            </Modal>
        </li>
      </ul>
    </div>
    </div>
  );
}
}

export default Filters;
