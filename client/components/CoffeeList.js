import React, { Component } from "react";
import { connect } from "react-redux";

export class CoffeeList extends Component {
	render() {
		console.log(this.props.coffees);
		return (
			<div>
				<h1>Check out our selection of coffees!</h1>
			</div>
		);
	}
}
