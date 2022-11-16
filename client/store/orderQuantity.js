const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const incrementQuantity = () => ({
	type: INCREMENT_QUANTITY,
});

export const decrementQuantity = () => ({
	type: DECREMENT_QUANTITY,
});

const initialState = { quantity: 0 };

export default function quantityReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT_QUANTITY:
			return { ...state, quantity: state.quantity + 1 };
		case DECREMENT_QUANTITY:
			return { ...state, quantity: state.quantity - 1 };
		default:
			return state;
	}
}
