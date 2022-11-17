import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  removeProduct,
  increment,
  decrementLog,
  updateDatabase,
  setLoggedUserState,
} from '../store/LoggedUserCart';

export class LoggedOrder extends Component {
  componentDidMount() {
    const userId = this.props.auth.id;
    const token = localStorage.getItem('token');
    this.props.setLoggedUserState(userId, token);
  }

  render() {
    const userId = this.props.auth.id;
    const token = localStorage.getItem('token');
    return (
      <div>
        {this.props.cart.length === 0 ? (
          <h1>Your cart is empty!</h1>
        ) : (
          <>
            <h1>Here's your order</h1>
            <div>
              {this.props.cart.map((product) => (
                <div key={product.coffeeId}>
                  <img
                    src={product.coffeeImage}
                    style={{ height: 300, width: 300 }}
                  />
                  <h3>{product.coffeeName}</h3>
                  <h3>Price: {product.coffeePrice}</h3>
                  <br />
                  <small>Order Quantity: {product.orderQuantity}</small>
                  <button
                    onClick={() => {
                      this.props.incrementProp(product.coffeeId);
                      this.props.updateDatabase(userId, token, this.props.cart);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      this.props.decrementProp(product.coffeeId);
                      this.props.updateDatabase(userId, token, this.props.cart);
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      this.props.removeProduct(product.coffeeId);
                      let newArray = [...this.props.cart];
                      newArray = newArray.filter(
                        (item) => item.coffeeId !== product.coffeeId
                      );
                      this.props.updateDatabase(userId, token, newArray);
                    }}
                  >
                    REMOVE
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.loggedCart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  incrementProp: (coffeeId) => dispatch(increment(coffeeId)),
  decrementProp: (coffeeId) => dispatch(decrementLog(coffeeId)),
  removeProduct: (coffeeId) => dispatch(removeProduct(coffeeId)),
  updateDatabase: (userId, token, currentStore) =>
    dispatch(updateDatabase(userId, token, currentStore)),
  setLoggedUserState: (userId, token) =>
    dispatch(setLoggedUserState(userId, token)),
});

export default connect(mapState, mapDispatch)(LoggedOrder);
