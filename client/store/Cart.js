import axios from "axios";

const ADD_CART = "ADD_CART";

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

export default function addCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      return action.coffee;
    default:
      return state;
  }
}
