// Reducer for managing the shopping cart state
function cartReducer(state, action) {

    // If state is undefined (initial load), return the initial state
    if (state === undefined) {
        return {
            totalCost: 0,        // Total cost of all products in the cart
            productCart: []      // Array holding cart items
        };
    }

    // Handle dispatched actions
    switch (action.type) {

        // ============================
        // ADD PRODUCT TO CART
        // ============================
        case "addProduct":
            return {
                ...state,  // Spread the existing state

                // Add product price to total cost
                totalCost: state.totalCost + parseInt(action.productData.productPrice),

                // Add the new product object to the array
                productCart: state.productCart.concat({
                    productName: action.productData.productName,
                    productPrice: action.productData.productPrice
                })
            };

        // ============================
        // DELETE PRODUCT FROM CART
        // ============================
        case "deleteProduct":

            // Create a filtered array removing the matching product
            const updatedArray = state.productCart.filter(product =>
                product.productName !== action.productData.productName
            );

            return {
                ...state,

                // Subtract the removed product's price from total cost
                totalCost: state.totalCost - parseInt(action.productData.productPrice),

                // Replace cart items with updated list
                productCart: updatedArray
            };

        // ============================
        // DEFAULT: RETURN CURRENT STATE
        // ============================
        default:
            return state;
    }
}

export default cartReducer;
