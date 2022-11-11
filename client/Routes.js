import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import CoffeeList from "./components/CoffeeList";
import SingleCoffee from "./components/SingleCoffee";
import { Signup } from "./components/SignUpForm";

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path='/home' component={Home} />
						<Route exact path='/coffees' component={CoffeeList} />
						<Route path='/coffees/:id' component={SingleCoffee} />
						<Route path='/signup'>
							<Redirect to='/home' />
						</Route>
					</Switch>
				) : (
					<Switch>
						<Route path='/' exact component={Login} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />
						<Route exact path='/coffees' component={CoffeeList} />
						<Route path='/coffees/:id' component={SingleCoffee} />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
