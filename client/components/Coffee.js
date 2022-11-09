import React from "react";
import { Link } from "react-router-dom";

const Coffee = (props) => {
	const { image, productName, price, id } = props.coffee;
	return (
		<div>
			<h3>{productName}</h3>
			<h4>{price}</h4>
			<Link to={`coffees/${id}`}>
				<img src={image} style={{ height: 300, width: 300 }} />
			</Link>
		</div>
	);
};

export default Coffee;
