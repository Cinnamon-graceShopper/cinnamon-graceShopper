import React from "react";
import { connect } from "react-redux";
import { addCart } from "../store/Cart";

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.props);
    this.props.addCart(this.props.coffeeId);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.coffee,
  auth: state.auth,
  // CHECK IF ISSUES ^^
});

const mapDispatch = (dispatch) => ({
  addCart: (id) => dispatch(addCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
