import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/Cart';

export class Order extends Component {
	render() {
		const cart =
			typeof localStorage.cart === 'undefined'
				? null
				: JSON.parse(localStorage.cart);
		//console.log(this.prop);
		const { increment } = this.props;
		return (
			<div>
				{cart === null ? (
					<h3>Your cart is empty!</h3>
				) : (
					<>
						<h1>Here's your current order</h1>
						<div>
							{cart.map((product) => (
								<div key={product.id}>
									<img
										src={product.image}
										style={{ height: 300, width: 300 }}
									/>
									<h3>{product.productName}</h3>
									<h3>Price: {product.price}</h3>
									<small>{product.description}</small>
									<br />
									<small>Order Quantity: {product.cartQuantity}</small>
									<button onClick={() => increment(product.id)}>+</button>
									<br />
									<br />
								</div>
							))}
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.coffees,
});

const mapDispatch = (dispatch) => ({
	increment: (coffeeId) => dispatch(incrementQuantity(coffeeId)),
	decrement: () => dispatch(decrementQuantity()),
});

export default connect(mapState, mapDispatch)(Order);
