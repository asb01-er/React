import React, { Component } from 'react';
import Product from './Product';

// Create a class-based component
class Products extends Component {
    products;

    constructor(props) {
        super(props);
        this.products = this.getProducts();
    }

    getProducts() {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.`,
                rating: 4,
                numOfReviews: 2
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris. `,
                rating: 2,
                numOfReviews: 12
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris. `,
                rating: 5,
                numOfReviews: 2
            }];
    }

    render() { // Loop through products array and render <Product /> for each
        const listProducts = this.products.map((product) =>
            <Product 
            key={product.productName} // key helps React identity list items
            data={product} />  // pass product data to child component
        );
        return (
            <div>
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

export default Products;