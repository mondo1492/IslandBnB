import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { Range } from 'rc-slider';
import { ReactiveBase, NumberBox, RangeSlider } from '@appbaseio/reactivesearch';

class Filters extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bedModalOpen: false,
      guestModalOpen: false,
      priceModalOpen: false
    };
    this.filterButtonClass = this.filterButtonClass.bind(this);
    this.modalButtonClass = this.modalButtonClass.bind(this);
    this.priceDisplay = this.priceDisplay.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.applyAndClose = this.applyAndClose.bind(this);
    this.cancelAndClose = this.cancelAndClose.bind(this);
  }

  filterButtonClass(bool) {
    return bool ? "filter-button" : "filter-button-selected";
  }

  modalButtonClass(bool) {
    return bool ? "cancel-hidden" : "cancel";
  }

  openModal(modalType) {
    this.setState({ [modalType]: true });
  }

  closeModal(modalType) {
    this.setState({ [modalType]: false });
  }

  applyAndClose(modalType) {
    this.props.applyChange();
    this.closeModal(modalType);
  }

  cancelAndClose(modalType) {
    this.props.cancelChange();
    this.closeModal(modalType);
  }

  priceDisplay() {
      if (this.props.priceMin === 0 && this.props.priceMax < 1000) {
        return `Up to $${this.props.priceMax}`;
      } else if (this.props.priceMin > 0 && this.props.priceMax < 1000) {
        return `$${this.props.priceMin} - $${this.props.priceMax}`;
      } else if (this.props.priceMin > 0 && this.props.priceMax === 1000) {
        return `$${this.props.priceMin}+`;
      } else {
        return `Price`;
      }
  }

  render() {
    const { bedMin, guestMin, priceMin, priceMax } = this.props.changeParams;
    const { min, max } = this.props.params.priceParams;
    return (
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
                onRequestClose={() => this.cancelAndClose("bedModalOpen")}
                className="modal-beds"
                overlayClassName="modal-overlay">
                <ReactiveBase app='bnb' credentials='none'>
                  <div className='bed-content'>
                    <NumberBox
                      componentId="NumberBoxSensor"
                      dataField="guests"
                      data={{ label: "Beds", start: 0, end: 50 }}
                      defaultSelected={bedMin}
                      onValueChange={(data)=>{this.props.updateBed(data);}}
                      />
                    <div className='bed-buttons'>
                      <div className={this.modalButtonClass(bedMin === 0)} onClick={()=>this.props.clearChange("bedCount")}>Clear</div>
                      <div className="apply" onClick={()=>this.applyAndClose("bedModalOpen")}>Apply</div>
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
                onRequestClose={()=>this.cancelAndClose("guestModalOpen")}
                className="modal-guests"
                overlayClassName="modal-overlay">
                <ReactiveBase app='bnb' credentials='none'>
                  <div className='bed-content'>
                    <NumberBox
                      componentId="NumberBoxSensor"
                      dataField="guests"
                      data={{ label: "Guests", start: 1, end: 50 }}
                      defaultSelected={guestMin}
                      onValueChange={(data)=>{this.props.updateGuest(data);}}
                      />
                    <div className='bed-buttons'>
                      <div className={ this.modalButtonClass(guestMin === 1) } onClick={()=>this.props.clearChange("guestCount")}>Clear</div>
                      <div className="apply" onClick={()=>this.applyAndClose("guestModalOpen")}>Apply</div>
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
                onRequestClose={()=>this.cancelAndClose("priceModalOpen")}
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
                    onChange={(value)=>{this.props.updatePrice(value)}}
                  />
                  <div className='bed-buttons'>
                    <div className={ this.modalButtonClass(priceMin === 0 && priceMax === 1000)}  onClick={()=>this.props.clearChange("priceAmount")}>Clear</div>
                    <div className="apply" onClick={()=>this.applyAndClose("priceModalOpen")}>Apply</div>
                  </div>
                </div>
              </Modal>
          </li>
          { this.props.noFiltersApplied() ? "" :
            <li>
              <button className='filter-button' onClick={() => this.props.resetFilters()}>
                <div className="filter-button-text">
                  Reset Filters
                </div>
              </button>
            </li>
          }
        </ul>
      </div>
      </div>
    );
  }
}

export default Filters;
