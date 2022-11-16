import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCart, _removeProduct } from '../store/Cart';

export class Order extends Component {
	render() {
		const cart =
			typeof localStorage.cart === 'undefined'
				? null
				: JSON.parse(localStorage.cart);
		const { addCart, removeProduct, increment } = this.props;
		console.log(this.props.cart);
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
									<button onClick={() => addCart(product.id)}>+</button>
									<button onClick={() => removeProduct(product)}>REMOVE</button>
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
	cart: state.cart,
});

const mapDispatch = (dispatch) => ({
	addCart: (id) => dispatch(addCart(id)),
	removeProduct: (product) => dispatch(_removeProduct(product)),
	increment: (coffeeId) => dispatch(incrementQuantity(coffeeId)),
});

export default connect(mapState, mapDispatch)(Order);
