import React from "react";

const Coffee = (props) => {
	const { image, productName, price } = props.coffee;
	return (
		<div>
			<h3>{productName}</h3>
			<h4>{price}</h4>
			<img src={image} style={{ height: 300, width: 300 }} />
		</div>
	);
};

export default Coffee;
