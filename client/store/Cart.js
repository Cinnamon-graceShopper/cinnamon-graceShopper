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
let coffeeIndex;

export default function addCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      if (state.length) {
        coffeeIndex = state.findIndex(
          (coffee) => coffee.id === action.coffee.id
        );
        console.log(">>>>>", state);
        console.log("****", action.coffee.id);
        if (coffeeIndex >= 0) {
          state[coffeeIndex].cartQuantity += 1;
        }
      } else {
        console.log(state);
        return [...state, { ...action, cartQuantity: 1 }];
      }
      return state;
    default:
      return state;
  }
}
