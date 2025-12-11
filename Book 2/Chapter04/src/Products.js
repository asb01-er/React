import React, { Component } from 'react';

// Create a class-based component
class Products extends Component {
    render() { // Array we want to display
        const products = ["Learning React", "Pro React", "Beginning React"];
        // Map over array and return <li> for each product
        // The 'key' helps React efficiently update list items
        const listProducts = products.map((product) =>
            <li key={product.toString()}>{product}</li>
        );
        // JSX must return ONE root element, so we wrap with
        return (
            <div>
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

export default Products;