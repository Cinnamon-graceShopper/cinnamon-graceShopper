import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { addCart, createCart } from '../store/Cart';
import { addProduct, updateDatabase } from '../store/LoggedUserCart';

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.cartArray = [];
  }
  handleClick() {
    const { isLoggedIn, id } = this.props;
    let localArray;
    if (!isLoggedIn) {
      this.props.addCart(this.props.coffeeId);
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        localArray = JSON.parse(localCart);
      }
    } else {
      this.props.addProduct(this.props.coffee);
      const userId = this.props.auth.id;
      const token = localStorage.getItem('token');
      const coffeeFormat = {
        coffeeId: this.props.coffee.id,
        coffeeImage: this.props.coffee.image,
        coffeeName: this.props.coffee.productName,
        coffeePrice: this.props.coffee.price,
        orderQuantity: 1,
      };

      let currentStore = [...this.props.loggedCart];
      const coffeeIndex = currentStore.findIndex(
        (item) => item.coffeeId === this.props.coffee.id
      );
      if (coffeeIndex >= 0) {
        currentStore[coffeeIndex].orderQuantity += 1;
      } else {
        currentStore = [...currentStore, coffeeFormat];
      }

      this.props.updateDatabase(userId, token, currentStore);
    }
  }
  render() {
    return (
      <div>
        <Button variant="contained" color="success" onClick={this.handleClick}>
          Add to Cart
        </Button>
        {/* <button onClick={this.handleClick}>Add to Cart</button> */}
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  isLoggedIn: !!state.auth.id,
  postToCart: state.cart,
  id: state.auth.id,
  auth: state.auth,
  loggedCart: state.loggedCart,
});

const mapDispatch = (dispatch) => ({
  addCart: (id) => dispatch(addCart(id)),
  createCart: (cart) => dispatch(createCart(cart)),
  addProduct: (product) => dispatch(addProduct(product)),
  updateDatabase: (userId, token, currentStore) =>
    dispatch(updateDatabase(userId, token, currentStore)),
});

export default connect(mapState, mapDispatch)(Cart);
