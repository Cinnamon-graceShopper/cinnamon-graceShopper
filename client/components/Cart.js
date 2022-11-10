import React from "react";
import { connect } from "../../server/api/coffees";
import { addCart } from "../store/Cart";

const Cart = (props) => {
  return <div></div>;
};

const mapState = (state) => ({
  cart: state.coffee,
  // CHECK IF ISSUES ^^
});

const mapDispatch = (dispatch) => ({
  addCart: (id) => dispatch(addCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
