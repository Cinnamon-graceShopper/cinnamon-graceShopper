import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { getCart } from '../store/Cart';


const Navbar = ({ handleClick, isLoggedIn }) =>{

// useEffect(()=>{
//     getCart()
// }, [])

return (
  <div>
    <h1>Cawfee Tawk Shawp</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>

          {/* Added path '/coffees' to Navbar */}
          <Link to="/coffees">Coffees</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {/* Added path '/coffees' to Navbar */}
          <Link to="/coffees">Coffees</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    // cartItms: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    // getCart: () => getCart(),
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
