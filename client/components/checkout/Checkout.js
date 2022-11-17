import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { _emptyCart } from '../../store/Cart';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const cartItems = JSON.parse(localStorage.getItem('cart'));
		const { cart, isLoggedIn, empty } = this.props;
		const guestTotaQuantity = cartItems.reduce(
			(acc, curr) => acc + +curr.cartQuantity,
			0
		);
		const guestTotalCost = cartItems.reduce(
			(acc, curr) => acc + +curr.price,
			0
		);
		return (
			<div>
				{isLoggedIn ? (
					<>
						<div>
							<h1>User Order Summary</h1>
						</div>
						<div>
							<h1>User Order Details</h1>
							<div>
								{cart.map((product) => (
									<div key={product.id}>
										<img
											src={product.image}
											style={{ height: 300, width: 300 }}
										/>
										<p>{product.productName}</p>
										<p>${product.price}</p>
										<p>Quantity: {product.cartQuantity}</p>
										Item Price: ${product.price * product.cartQuantity}
										<br />
										<br />
										<Link to='/confirm'>
											<button>Checkout</button>
										</Link>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						<div>
							<h1>Guest Order Summary</h1>
						</div>
						<div>
							<h1>Guest Order Details</h1>
							<h3>Price at checkout: ${guestTotaQuantity * guestTotalCost}</h3>
							<div>
								{cartItems.map((product) => (
									<div key={product.id}>
										<img
											src={product.image}
											style={{ height: 300, width: 300 }}
										/>
										<p>{product.productName}</p>
										<p>${product.price}</p>
										<p>Quantity: {product.cartQuantity}</p>
										Item Price: ${product.price * product.cartQuantity}
										<br />
										<br />
										<Link to='/confirm'>
											<button onClick={() => empty()}>Checkout</button>
										</Link>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.cart,
	isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
	empty: () => dispatch(_emptyCart()),
});

export default connect(mapState, mapDispatch)(Checkout);
