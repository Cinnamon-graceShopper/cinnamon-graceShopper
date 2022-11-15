import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/orderQuantity';

export class Order extends Component {
	render() {
		const cart =
			typeof localStorage.cart === 'undefined'
				? null
				: JSON.parse(localStorage.cart);
		const { quantity } = this.props.orderQuantity;
		const { increment, decrement } = this.props;
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
									<h3>{product.price}</h3>
									<small>{product.description}</small>
									<br />
									<small>Inventory Quantity: {product.quantity}</small>
									<br />
									<small>Order Quantity: {quantity}</small>

									{quantity < product.quantity ? (
										<button onClick={increment}>+</button>
									) : (
										<small>Exceeded the limit of quantity</small>
									)}

									{quantity >= 1 ? (
										<button onClick={decrement}>-</button>
									) : (
										<small>Can't go below 0</small>
									)}
									<br />
									<br />
								</div>
							))}
						</div>
					</>
				)}
				{/* <>
				<h1>Here's your current order</h1>
				<div>
					{cart.map((product) => (
						<div key={product.id}>
							<img src={product.image} style={{ height: 300, width: 300 }} />
							<h3>{product.productName}</h3>
							<h3>{product.price}</h3>
							<small>{product.description}</small>
							<br />
							<small>Inventory Quantity: {product.quantity}</small>
							<br />
							<small>Order Quantity: {quantity}</small>

							{quantity < product.quantity ? (
								<button onClick={increment}>+</button>
							) : (
								<small>Exceeded the limit of quantity</small>
							)}

							{quantity >= 1 ? (
								<button onClick={decrement}>-</button>
							) : (
								<small>Can't go below 0</small>
							)}
							<br />
							<br />
						</div>
					))}
				</div>
				</> */}
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.coffees,
	orderQuantity: state.quantity,
});

const mapDispatch = (dispatch) => ({
	increment: () => dispatch(incrementQuantity()),
	decrement: () => dispatch(decrementQuantity()),
});

export default connect(mapState, mapDispatch)(Order);
