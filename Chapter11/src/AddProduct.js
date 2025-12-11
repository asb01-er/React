import React, { Component } from "react";

class AddProduct extends Component {
    // ================================
    // Component State
    // ================================
    // Holds the input values for product name and price
    state = {
        productName: '',   // Name of the product entered by user
        productPrice: 0    // Price of the product entered by user
    }

    // ================================
    // Handlers for input changes
    // ================================

    // Update state when product name input changes
    productNameChangedHandler = (event) => {
        this.setState({ productName: event.target.value });
    }

    // Update state when product price input changes
    productPriceChangedHandler = (event) => {
        this.setState({ productPrice: event.target.value });
    }

    render() {
        return (
            <div className="container">

                {/* Heading */}
                <h1>WELCOME TO THE REAL DEAL</h1>

                {/* Input for product name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    onChange={this.productNameChangedHandler} // Call handler on change
                    value={this.state.productName}           // Bind to state
                />

                {/* Input for product price */}
                <input
                    type="number"
                    placeholder="Product Price"
                    onChange={this.productPriceChangedHandler} // Call handler on change
                    value={this.state.productPrice}            // Bind to state
                />

                {/* Add Product Button */}
                <button
                    className="buttons"
                    onClick={() => {
                        // Call the addProduct function from props
                        // Pass the current state values (productName and productPrice)
                        this.props.addProduct(this.state.productName, this.state.productPrice);
                    }}
                >
                    Add Product
                </button>
            </div>
        );
    }
};

export default AddProduct;
