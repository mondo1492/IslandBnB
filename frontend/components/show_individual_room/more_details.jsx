import React from 'react';
import { Link } from 'react-router-dom';

class Description extends React.Component{
  render() {
    const room = this.props.room;
    return(
      <div className="show-page-more-details">
        <div className="detail-container">
          <div className="detail-item">
            <h4>The space</h4>
          </div>
          <div className="detail-list">
            <ul>
              <li>
                <h4 className="detail-list-name">Accommodates:</h4>
                <h4>{ room.num_guests ? room.num_guests : "" }</h4>
              </li>
              <li>
                <h4 className="detail-list-name">Room type:</h4>
                <h4>{ room.room_type ? room.room_type : "" }</h4>
              </li>
              <li>
                <h4 className="detail-list-name">Beds:</h4>
                <h4>{ room.beds ? room.beds : "" }</h4>
              </li>
              <li>
                <h4 className="detail-list-name">Property type:</h4>
                <h4>{ room.prop_type ? room.prop_type : "" }</h4>
              </li>
              <li>
                <h4 className="detail-list-name">Bedrooms:</h4>
                <h4>{ room.bedrooms ? room.bedrooms : "" }</h4>
              </li>
            </ul>
          </div>

        </div>
        <div className="detail-container">
          <div className="detail-item">
            <h4>Amenities</h4>
          </div>
          <div className="detail-list">
            <ul>
              <li>
                <h4>Nothing lol</h4>
              </li>
            </ul>
          </div>

        </div>
        <div className="detail-container">
          <div className="detail-item">
            <h4>Price</h4>
          </div>
            <div className="detail-list">
              <ul>
                <li>
                  <h4>$ </h4>
                  <h4 id="cost-bold">{ room.price ? room.price : "" }</h4>
                  <h4> per night</h4>
                </li>
              </ul>
            </div>
        </div>
        <div className="detail-container">
          <div className="detail-item">
            <h4>House Rules</h4>
            </div>
            <div className="detail-list">
              <ul>
                <li>
                  <h4>No smoking</h4>
                </li>
              </ul>
            </div>
        </div>
        <div className="detail-container-cancellation">
          <div className="detail-item">
            <h4>Cancellations</h4>
          </div>
            <div className="detail-list">
              <h4 id="cancellation-policy">
                This host has a Moderate Cancellation Policy — 100% refundable
              </h4>
              <h4 id="cancellation-text">
                Cancel up to 7 days before your trip and get a full refund.
                Cancel within 7 days of the trip and get a 50% refund of
                the nightly rate, as well as a full refund of fees.
              </h4>
            </div>
        </div>
        <div className="detail-container">
          <div className="detail-item">
            <h4>Safety features</h4>
            </div>
            <div className="detail-list">
              <ul>
                <li>
                  <h4>Smoke detector</h4>
                </li>
                <li>
                  <h4>Carbon monoxide detector</h4>
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
