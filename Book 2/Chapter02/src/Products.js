// Import React to enable JSX and component creation
import React from "react";

// Products functional component
// Responsible for displaying a list of product names
function Products() {

    // Array holding product names
    // This represents data that will be rendered in the UI
    const products = ["Learning React", "Pro React", "Beginning React"];

    // Convert the products array into a list of <li> elements
    // map() loops through each product and returns JSX
    const listProducts = products.map((product) =>
        // key helps React identify each list item efficiently
        <li key={product.toString()}>
            {product}
        </li>
    );

    // JSX that renders the product list to the browser
    return (
        <div>
            {/* Render the list of products inside an unordered list */}
            <ul>
                {listProducts}
            </ul>
        </div>
    );
}

// Export Products so it can be imported and used in other files
export default Products;
