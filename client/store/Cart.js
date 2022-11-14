import axios from 'axios';

const ADD_CART = 'ADD_CART';

const _addCart = (coffee) => ({
	type: ADD_CART,
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

const initialState = [];
let coffeeIndex, tempProduct;

export default function addCartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART:
			tempProduct = { ...action, cartQuantity: 1 };
			coffeeIndex = state.findIndex(
				(item) => item.coffee.id === action.coffee.id
			);
			if (coffeeIndex >= 0) state[coffeeIndex].cartQuantity += 1;
			else return [...state, tempProduct];
			return state;
		default:
			return state;
	}
}
