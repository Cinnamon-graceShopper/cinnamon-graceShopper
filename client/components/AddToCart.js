import React from 'react';
import { connect } from 'react-redux';
import { addCart } from '../store/Cart';

export class Cart extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.cartArray = [];
	}
	handleClick() {
		const { isLoggedIn } = this.props;
		this.props.addCart(this.props.coffeeId);
		if (!isLoggedIn) {
			let hash = {};
			let quantity = 0;
			let item = this.props.cart.filter(
				(item) => item.id === this.props.coffeeId
			)[0];
			const getCarStorage = localStorage.getItem('cart');
			if (getCarStorage) {
				this.cartArray = JSON.parse(localStorage.getItem('cart'));
				const filteredArr = this.cartArray.filter((coffee) => {
					return coffee.id === 1;
				});
				console.log(filteredArr);

				this.cartArray.push(item);

				localStorage.setItem('cart', JSON.stringify(this.cartArray));
			} else {
				this.cartArray.push(item);
				localStorage.setItem('cart', JSON.stringify(this.cartArray));
			}
		} else {
			console.log('uh oh');
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
	cart: state.coffees,
	isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
	addCart: (id) => dispatch(addCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
