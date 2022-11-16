import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCoffees } from "../store/allCoffees";
import Coffee from "./Coffee";
import Cart from "./AddToCart";
import { Grid } from "@mui/material";


export class CoffeeList extends Component {
	componentDidMount() {
		this.props.getCoffees();
	}


  render() {
    const { coffees } = this.props;
    return (
      <div>
        <h1>Check out our selection of coffees!</h1>
        <div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {coffees.map((coffee) => (
              <Grid item xs={2} sm={4} md={4} key={coffee.id}>
                {/* <div key={coffee.id}> */}
                <Coffee coffee={coffee} />
                <Cart coffeeId={coffee.id} />
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
	coffees: state.coffees,
});

const mapDispatch = (dispatch) => ({
	getCoffees: () => dispatch(fetchCoffees()),
});

export default connect(mapState, mapDispatch)(CoffeeList);
