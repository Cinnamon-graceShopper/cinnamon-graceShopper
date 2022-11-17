import { Button, ListItemText } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppbarContainer,
  AppbarHeader,
  ProductList,
} from '../../styles/navbar';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <AppbarContainer>
      <AppbarHeader>Cawfee Tawk Shawp</AppbarHeader>
      <nav>
        {isLoggedIn ? (
          <div>
            <ProductList type="row">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">
                <Button variant="contained">Home</Button>
              </Link>
              <a href="#" onClick={handleClick}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#EF1836',
                  }}
                >
                  Logout
                </Button>
              </a>

              {/* Added path '/coffees' to Navbar */}
              <Link to="/coffees">
                <Button variant="contained">Coffees</Button>
              </Link>

              <Link to="/loggedorder">
                <Button variant="contained">Order</Button>
              </Link>
            </ProductList>
          </div>
        ) : (
          <div>
            <ProductList type="row">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Button variant="contained" color="success">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained">Sign Up</Button>
              </Link>
              {/* Added path '/coffees' to Navbar */}
              <Link to="/coffees">
                <Button variant="contained">Coffees</Button>
              </Link>
              <Link to="/order">Order</Link>
            </ProductList>
          </div>
        )}
      </nav>
      <hr />
    </AppbarContainer>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
