import axios from "axios";

const ALL_COFFEE = "ALL_COFFEE";

const _fetchCoffees = (coffees) => ({
	type: ALL_COFFEE,
	coffees,
});

export const fetchCoffees = () => async (dispatch) => {
	try {
		const { data } = await axios.get("/api/coffees");
		dispatch(_fetchCoffees(data));
	} catch (err) {
		console.error(err);
	}
};

const initialState = [];

export default function allCoffeesReducer(state = initialState, action) {
	switch (action.type) {
		case ALL_COFFEE:
			return action.coffees;
		default:
			return state;
	}
}
