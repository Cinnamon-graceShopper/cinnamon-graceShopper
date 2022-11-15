import { Button, TextField } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { signup } from "../store/user";
//import { authenticate } from "../store/user";

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {/* <label htmlFor="username">
            <small>Email</small>
          </label>
          <input name="username" type="text" /> */}
          <TextField
            required
            name="username"
            type="text"
            label="Email"
            variant="standard"
          />
        </div>
        <div>
          {/* <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" /> */}
          <TextField
            required
            name="password"
            type="password"
            label="Password"
            variant="standard"
          />
        </div>
        <div>
          {/* <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="firstName" /> */}
          <TextField
            required
            name="firstName"
            type="firstName"
            label="First Name"
            variant="standard"
          />
        </div>
        <div>
          {/* <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="lastName" /> */}
          <TextField
            required
            name="lastName"
            type="lastName"
            label="Last Name"
            variant="standard"
          />
        </div>
        <div>
          {/* <button type="submit">{displayName}</button> */}
          <Button variant="contained" color="success" type="submit">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      dispatch(signup(username, password, firstName, lastName, formName));
      //dispatch(authenticate(username, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
