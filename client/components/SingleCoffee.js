import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCoffee } from "../store/singleCoffee";

class SingleCoffee extends Component {
	componentDidMount() {
		this.props.fetchCoffee(this.props.match.params.id);
	}

	render() {
		const { productName, price, image, description } = this.props.coffee;
		return (
			<div>
				<h1>Single Coffee Display</h1>
				<img src={image} style={{ height: 300, width: 300 }} />
				<h3>{productName}</h3>
				<h4>{description}</h4>
				<h4>{price}</h4>
			</div>
		);
	}
}

const mapState = ({ coffee }) => ({
	coffee,
});

const mapDispatch = (dispatch) => ({
	fetchCoffee: (id) => dispatch(fetchCoffee(id)),
});

export default connect(mapState, mapDispatch)(SingleCoffee);
