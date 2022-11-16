import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/orderQuantity';

const Product = (props) => {
	const { image, description, productName, ingredients, price, quantity } =
		props.product;
	const [order, setOrder] = useState({ quantity });
	//const dispatch = useDispatch();
	const handleIncrement = () => {
		setOrder((prevCount) => prevCount + 1);
	};

	//Create handleDecrement event handler
	const handleDecrement = () => {
		setOrder((prevCount) => prevCount - 1);
	};
	return (
		<div>
			<img src={image} style={{ height: 300, width: 300 }} />
			<h3>{productName}</h3>
			<h3>{price}</h3>
			<small>{description}</small>
			<br />
			<small>Quantity: {order}</small>
			<button onClick={handleIncrement}>+</button>
			<button onClick={handleDecrement}>-</button>
		</div>
	);
};

export default Product;
