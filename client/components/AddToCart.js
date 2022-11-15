import React from 'react';
import { connect } from 'react-redux';
import { addCart } from '../store/Cart';
import { createCart } from '../store/Cart';

export class Cart extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.cartArray = [];
	}
	handleClick() {
		const { isLoggedIn, id } = this.props;
		let localArray;
		if (!isLoggedIn) {
			this.props.addCart(this.props.coffeeId);
			const localCart = localStorage.getItem('cart');
			if (localCart) {
				localArray = JSON.parse(localCart);
				// localArray.map((item) => {
				// 	console.log(
				// 		'totalQuntity:',
				// 		item.cartQuantity,
				// 		'coffeeId:',
				// 		item.coffee.id,
				// 		'name:',
				// 		item.coffee.productName
				// 	);
				// });
			}
		} else {
			this.props.createCart({
				completed: false,
				userId: id,
				date: new Date().toLocaleDateString(),
			});
		}
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Add to Cart</button>
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.cart,
	isLoggedIn: !!state.auth.id,
	postToCart: state.cart,
	id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
	addCart: (id) => dispatch(addCart(id)),
	createCart: (cart) => dispatch(createCart(cart)),
});

export default connect(mapState, mapDispatch)(Cart);
