import { Button, TextField } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {/* <label htmlFor='username'>
						<small>Email</small>
					</label>
					<input name='username' type='text' /> */}
          <TextField
            id="username"
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
            id="password"
            name="password"
            type="password"
            label="Password"
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
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
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
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
