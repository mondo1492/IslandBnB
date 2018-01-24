
import React from 'react';
import createClass from 'create-react-class';
import VirtualizedSelect from 'react-virtualized-select';

const DATA = require('../data/cities');

const roomTypeNames = [{name: "Select one"},
{ name: "Apartment" },
{ name: "Condominium" },
{ name: "Guesthouse" },
{ name: "House" },
{ name: "Hotel" },
{ name: "n-law" },
{ name: "Guest suite" },
{ name: "Townhosue" },
{ name: "Vacation home" },
{ name: "───────────────────" },
{ name: "Boat" },
{ name: "Bungalow" },
{ name: "Cabin" },
{ name: "Castle" },
{ name: "Cave" },
{ name: "Chalet" },
{ name: "Dorm" },
{ name: "Earth House" },
{ name: "Igloo" },
{ name: "Island" },
{ name: "Lighthouse" },
{ name: "Plane" },
{ name: "Camper" },
{ name: "Tent" },
{ name: "Tipi" },
{ name: "Train" },
{ name: "Treehouse" },
{ name: "Villa" },
{ name: "Yurt" }];

var CitiesField = createClass({
	displayName: 'CitiesField',
	getInitialState () {
		return {};
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render () {
		var options = DATA.CITIES;
		return (
			<div className="section">
				<h3 className="section-heading">Cities (Large Dataset)</h3>
				<VirtualizedSelect ref="citySelect"
					options={options}
					simpleValue
					clearable
					name="select-city"
					value={this.state.selectValue}
					onChange={this.updateValue}
					searchable
					labelKey="name"
					valueKey="name"
				/>
				<div className="hint">
					Uses <a href="https://github.com/bvaughn/react-virtualized">react-virtualized</a> and <a href="https://github.com/bvaughn/react-virtualized-select/">react-virtualized-select</a> to display a list of the world's 1,000 largest cities.
				</div>
			</div>
		);
	}
});
module.exports = CitiesField;
