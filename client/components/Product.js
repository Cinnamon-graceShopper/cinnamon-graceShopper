import React from 'react';

const Product = (props) => {
	const { image, description, productName, ingredients, price } = props.product;
	return (
		<div>
			<img src={image} style={{ height: 300, width: 300 }} />
			<h3>{productName}</h3>
			<h3>{price}</h3>
			<small>{description}</small>
		</div>
	);
};

export default Product;
