import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCoffees } from "../store/allCoffees";

export class CoffeeList extends Component {
	// componentDidMount() {
	// 	this.props.fetchCoffees();
	// }

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Check out our selection of coffees!</h1>
			</div>
		);
	}
}

const mapState = (state) => ({
	coffees: state.coffees,
});

const mapDispatch = (dispatch) => ({
	fetchCoffees: () => dispatch(fetchCoffees()),
});

export default connect(mapState, mapDispatch)(CoffeeList);
