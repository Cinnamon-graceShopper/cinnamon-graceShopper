import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoffees } from '../store/allCoffees';
import Coffee from './Coffee';
import Cart from './AddToCart';

export class CoffeeList extends Component {
	componentDidMount() {
		this.props.getCoffees();
	}

	render() {
		const { coffees } = this.props;
		return (
			<div>
				<h1>Check out our selection of coffees!</h1>
				<div>
					{coffees.map((coffee) => (
						<div key={coffee.id}>
							<Coffee coffee={coffee} />
							<Cart coffeeId={coffee.id} />
						</div>
					))}
				</div>
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
