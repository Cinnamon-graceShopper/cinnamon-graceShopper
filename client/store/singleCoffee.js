import axios from "axios";

const FETCH_COFFEE = "FETCH_COFFEE";

export const _fetchCoffee = (coffee) => ({
	type: FETCH_COFFEE,
	coffee,
});

export const fetchCoffee = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/coffees/${id}`);
			dispatch(_fetchCoffee(data));
		} catch (err) {
			console.error(err);
		}
	};
};

const initialState = {};
export default function singleCoffeeReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_COFFEE:
			return action.coffee;
		default:
			return state;
	}
}
