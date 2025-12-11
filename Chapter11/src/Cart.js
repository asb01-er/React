import React, { Component } from "react";
import AddProduct from './AddProduct';
import { Table } from 'reactstrap';

class Cart extends Component {
    render() {
        return (
            <div className="container">

                {/* Component that handles adding a product.
                    We pass down the function from props to trigger Redux action. */}
                <AddProduct addProduct={this.props.onAddProduct} />

                {/* Display the products in a table */}
                <Table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>#</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loop through each product in the cart array */}
                        {this.props.productCart.map(productData => (
                            <tr key={productData.productName}>
                                {/* Show product name */}
                                <td>{productData.productName}</td>

                                {/* Show price */}
                                <td>{productData.productPrice}</td>

                                {/* Remove button — clicking triggers the delete action */}
                                <td
                                    onClick={() =>
                                        this.props.onDeleteProduct(productData)
                                    }
                                    style={{ cursor: "pointer", color: "red" }}
                                >
                                    Remove
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Display total cost of all products */}
                <span>Total Amount: {this.props.totalCost}</span>
            </div>
        );
    }
};

export default Cart;
