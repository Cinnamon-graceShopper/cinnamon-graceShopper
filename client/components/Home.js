import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username } = props;

	return (
		<div>
			<h3>Welcome, {username.split("@")[0]}</h3>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
	};
};

export default connect(mapState)(Home);
