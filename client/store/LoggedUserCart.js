import axios from 'axios';

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const INCREMENT = 'INCREMENT';
const DECREMENTLOG = 'DECREMENTLOG';
const LOGGED_USER = 'LOGGED_USER';

const _addProduct = (coffee) => ({
  type: ADD_PRODUCT,
  coffee,
});

const _removeProduct = (coffeeId) => ({
  type: REMOVE_PRODUCT,
  coffeeId,
});

const _increment = (coffeeId) => ({
  type: INCREMENT,
  coffeeId,
});

const _decrement = (coffeeId) => ({
  type: DECREMENTLOG,
  coffeeId,
});

const loggedUser = (cleanedCoffees) => ({
  type: LOGGED_USER,
  cleanedCoffees,
});

export const addProduct = (coffee) => async (dispatch) => {
  dispatch(_addProduct(coffee));
};

export const removeProduct = (coffee) => async (dispatch) => {
  dispatch(_removeProduct(coffee));
};

export const decrementLog = (coffeeId) => async (dispatch) => {
  dispatch(_decrement(coffeeId));
};

export const increment = (coffeeId) => async (dispatch) => {
  dispatch(_increment(coffeeId));
};

export const updateDatabase = (userId, token, currentStore) => {
  return async (dispatch) => {
    try {
      //Deleting everything for the User's cart
      await axios.delete(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      //Creating User's cart items
      await axios.post(`/api/cart/${userId}`, currentStore, {
        headers: {
          authorization: token,
        },
      });
      //Pulling cart data to add to store
      const { data } = await axios.get(`/api/cart/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      const cleanedCoffees = data.coffees.map((coffee) => {
        return {
          coffeeId: coffee.id,
          coffeeImage: coffee.image,
          coffeeName: coffee.productName,
          coffeePrice: coffee.OrderCoffee.price,
          orderQuantity: coffee.OrderCoffee.quantity,
        };
      });
      dispatch(loggedUser(cleanedCoffees));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setLoggedUserState = (userId, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/:${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      const cleanedCoffees = data.coffees.map((coffee) => {
        return {
          coffeeId: coffee.id,
          coffeeImage: coffee.image,
          coffeeName: coffee.productName,
          coffeePrice: coffee.OrderCoffee.price,
          orderQuantity: coffee.OrderCoffee.quantity,
        };
      });
      dispatch(loggedUser(cleanedCoffees));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];
let coffeeIndex, incrementCopy, decrementCopy;

export default function loggedCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const coffeeFormat = {
        coffeeId: action.coffee.id,
        coffeeImage: action.coffee.image,
        coffeeName: action.coffee.productName,
        coffeePrice: action.coffee.price,
        orderQuantity: 1,
      };

      coffeeIndex = state.findIndex((item) => item.id === action.coffee.id);
      if (coffeeIndex >= 0) {
        incrementCopy = [...state];
        incrementCopy[coffeeIndex].orderQuantity += 1;
        return [...incrementCopy];
      } else {
        return [...state, coffeeFormat];
      }

    case REMOVE_PRODUCT:
      const newArr = [...state];
      const arr = newArr.filter((item) => item.coffeeId !== action.coffeeId);
      return arr;

    case INCREMENT:
      incrementCopy = [...state];
      coffeeIndex = incrementCopy.findIndex(
        (item) => item.coffeeId === action.coffeeId
      );
      incrementCopy[coffeeIndex].orderQuantity += 1;
      return [...incrementCopy];

    case DECREMENTLOG:
      decrementCopy = [...state];
      coffeeIndex = decrementCopy.findIndex(
        (item) => item.coffeeId === action.coffeeId
      );
      decrementCopy[coffeeIndex].orderQuantity -= 1;
      return [...decrementCopy];

    case LOGGED_USER:
      return [...action.cleanedCoffees];

    default:
      return state;
  }
}
