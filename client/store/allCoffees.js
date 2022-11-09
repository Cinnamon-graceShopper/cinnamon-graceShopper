import axios from "axios";

const ALL_COFFEE = "ALL_COFFEE";

const _fetchCoffees = (coffees) => ({
	type: ALL_COFFEE,
	coffees,
});

export const fetchCoffees = () => {
	try {
		return async (dispatch) => {
			const { data } = await axios.get("/api/coffees");
			dispatch(_fetchCoffees(data));
		};
	} catch (err) {
		console.log(err);
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
