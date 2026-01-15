import React, { Component } from 'react';
import Product from './Product';

function Products() {

    // Function that returns an array of product objects
    // In real applications, this data usually comes from an API
    const getProducts = () => {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
                rating: 4,
                numOfReviews: 2
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
                rating: 2,
                numOfReviews: 12
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
                rating: 5,
                numOfReviews: 2
            }
        ];
    };

    // Store the returned products array for rendering
    const products = getProducts();

    // Convert each product object into a Product component
    // map() is used to dynamically render components from data
    const listProducts = products.map((product) =>
        <Product
            key={product.productName}
            data={product}
        />
    );

    // Render the list of Product components
    return (
        <div>
            <ul>
                {listProducts}
            </ul>
        </div>
    );
}

export default Products;
