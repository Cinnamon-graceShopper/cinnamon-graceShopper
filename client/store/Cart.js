import axios from 'axios';

const ADD_CART = 'ADD_CART';
const CREATE_CART = 'CREATE_CART';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const DECREMENT = 'DECREMENT';

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

export const decrement = (coffee) => ({
  type: DECREMENT,
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
let coffeeIndex, tempProduct, reduceIndex;

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

    //Decrement is working
    case DECREMENT:
      reduceIndex = state.findIndex((item) => item.id == action.coffee);

      if (state[reduceIndex].cartQuantity > 1) {
        state[reduceIndex].cartQuantity -= 1;
        localStorage.setItem('cart', JSON.stringify([...state]));
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
