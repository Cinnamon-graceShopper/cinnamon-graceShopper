import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCoffees } from "../store/allCoffees";

export class CoffeeList extends Component {
	componentDidMount() {
		this.props.getCoffees();
	}

	render() {
		const { coffees } = this.props;
		return (
			<div>
				<h1>Check out our selection of coffees!</h1>
				<div></div>
			</div>
		);
	}
}

const mapState = (state) => ({
	coffees: state.coffees,
});

const mapDispatch = (dispatch) => ({
	getCoffees: () => dispatch(fetchCoffees()),
});

export default connect(mapState, mapDispatch)(CoffeeList);
