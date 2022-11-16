import React from 'react';
import { connect } from 'react-redux';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const cartItems = JSON.parse(localStorage.getItem('cart'));
		const { cart } = this.props;
		return (
			<>
				<div>
					<h1>Order Summary</h1>
				</div>
				<div>
					<h1>Order Details</h1>
					<div>
						{cartItems.map((product) => (
							<div key={product.id}>
								<img src={product.image} style={{ height: 300, width: 300 }} />
								<p>{product.productName}</p>
								<p>${product.price}</p>
								<p>Quantity: {product.cartQuantity}</p>
								Item Price: ${product.price * product.cartQuantity}
								<br />
								<br />
								<button>Checkout</button>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state) => ({
	cart: state.cart,
	isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
	submitOrder: () => dispatch(submitOrder()),
});

export default connect(mapState, mapDispatch)(Checkout);
