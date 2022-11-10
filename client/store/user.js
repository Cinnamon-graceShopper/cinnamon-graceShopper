import axios from "axios";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_USER = "SET_USER";

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: SET_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		const res = await axios.get("/auth/me", {
			headers: {
				authorization: token,
			},
		});
		return dispatch(setUser(res.data));
	}
};

export const signup =
	(username, password, firstName, lastName, method) => async (dispatch) => {
		try {
			const res = await axios.post(`/auth/${method}`, {
				username,
				password,
				firstName,
				lastName,
			});
			window.localStorage.setItem(TOKEN, res.data.token);
			dispatch(me());
		} catch (authError) {
			return dispatch(setAuth({ error: authError }));
		}
	};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_USER:
			return action.user;
		default:
			return state;
	}
}
