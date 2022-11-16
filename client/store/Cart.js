import axios from 'axios';

const ADD_CART = 'ADD_CART';
const CREATE_CART = 'CREATE_CART';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

const _addCart = (coffee) => ({
	type: ADD_CART,
	coffee,
});

const _createCart = (coffee) => ({
	type: CREATE_CART,
	coffee,
});

export const _removeProduct = (coffee) => ({
	type: REMOVE_PRODUCT,
	coffee,
});

const _decreaseQuantity = (coffee) => ({
	type: DECREASE_QUANTITY,
	coffee,
});

export const addCart = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/coffees/${id}`);
		dispatch(_addCart(data));
	} catch (error) {
		console.error(error);
	}
};

export const createCart = (cart) => async (dispatch) => {
	try {
		const { data: created } = await axios.post('/api/cart', cart);
		dispatch(_createCart(created));
	} catch (error) {
		console.error(error);
	}
};

const initialState = [];
let coffeeIndex, tempProduct;

export default function addCartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART:
			tempProduct = { ...action.coffee, cartQuantity: 1 };
			coffeeIndex = state.findIndex((item) => item.id === action.coffee.id);
			if (coffeeIndex >= 0) {
				state[coffeeIndex].cartQuantity += 1;
				localStorage.setItem('cart', JSON.stringify([...state]));
			} else {
				localStorage.setItem('cart', JSON.stringify([...state, tempProduct]));
				return [...state, tempProduct];
			}
			return [...state];
		case REMOVE_PRODUCT:
			const newArr = [...state];
			const arr = newArr.filter((item) => item.id !== action.coffee.id);
			localStorage.setItem('cart', JSON.stringify(arr));
			return arr;
		default:
			return state;
	}
}

// case CREATE_CART:
// 	return [...state, action.coffee];
// 	return [...filteredState, coffee];
// tempProduct = { ...action.coffee, cartQuantity: 1 };
// coffeeIndex = state.findIndex((item) => item.id === action.coffee.id);
// if (coffeeIndex >= 0) {
// 	state[coffeeIndex].cartQuantity += 1;
// 	localStorage.setItem('cart', JSON.stringify([...state]));
// } else {
// 	localStorage.setItem('cart', JSON.stringify([...state, tempProduct]));
// 	return [...state, tempProduct];
// }
// return [...state];

// case INCREMENT_QUANTITY:
// 	let coffeeArray = state.filter((coffee) => {
// 		return coffee.id === action.coffeeId;
// 	});
// 	let coffee = { ...coffeeArray[0] };
// 	coffee.cartQuantity += 1;
// 	let filteredState = state.filter((coffee) => {
// 		return coffee.id != action.coffeeId;
// 	});

// case REMOVE_PRODUCT:
// 	const nextCartItems = state.cart.filter(
// 		(item) => item.id !== action.coffee.id
// 	);
// 	state.cart = nextCartItems;
// case DECREASE_QUANTITY:
// 	const itemIndex = state.cart.findIndex(
// 		(item) => item.id === action.coffee.id
// 	);
// 	if (state.cart[itemIndex].cartQuantity > 1) {
// 		state.cart[itemIndex].cartQuantity -= 1;
// 	} else if (state.cart[itemIndex] === 1) {
// 		const nextCartItems = state.cart.filter(
// 			(cartItem) => cartItem.id !== action.coffee.id
// 		);
// 		state.cart = nextCartItems;
// 	}
// 	localStorage.setItem('cart', JSON.stringify(state.cart));

//const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
// const _removeProduct = (coffee) => ({
// 	type: REMOVE_PRODUCT,
// 	coffee,
// });

//let coffeeIndex, tempProduct;

// export const removeProduct = () => async (dispatch) => {
// 	try {
// 		const { data } = await axios.delete(`/api/order`);
// 		dispatch(_removeProduct(data));
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
// export const _decreaseQuantity = (coffee) => ({
// 	type: DECREASE_QUANTITY,
// 	coffee,
// });
