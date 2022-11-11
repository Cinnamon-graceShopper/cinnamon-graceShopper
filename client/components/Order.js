import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';

export class Order extends Component {
	render() {
		const cart = JSON.parse(localStorage.cart);
		return (
			<div>
				<h1>Here's your current order</h1>
				<div>
					{cart.map((product) => (
						<div key={product.id}>
							<Product product={product} />
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.coffees,
});

export default connect(mapState)(Order);
