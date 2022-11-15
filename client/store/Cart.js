import axios from 'axios';

const ADD_CART = 'ADD_CART';
const CREATE_CART = 'CREATE_CART';
const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
// const GET_CART = "GET_CART"

const _addCart = (coffee) => ({
  type: ADD_CART,
  coffee,
});

const _createCart = (coffee) => ({
  type: CREATE_CART,
  coffee,
});

export const incrementQuantity = (coffeeId) => ({
  type: INCREMENT_QUANTITY,
  coffeeId,
});

// const _getCart = (coffee) => ({
//   type: GET_CART,
//   coffee,
// });

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

// export const getCart = () => async (dispatch) => {
//   try {

//     const { data } = await axios.get(`/api/cart`);
//     dispatch(_getCart(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

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
    case CREATE_CART:
      return [...state, action.coffee];
    case INCREMENT_QUANTITY:
      let coffeeArray = state.filter((coffee) => {
        return coffee.id === action.coffeeId;
      });
      console.log(coffeeArray);
      let coffee = { ...coffeeArray[0] };
      coffee.cartQuantity += 1;
      let filteredState = state.filter((coffee) => {
        return coffee.id != action.coffeeId;
      });
      return [...filteredState, coffee];
    // case GET_CART:
    //   return [...state, action.coffee]
    default:
      return state;
  }
}
