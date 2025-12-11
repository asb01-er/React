// Import `connect` from react-redux to connect a React component to the Redux store
import { connect } from "react-redux";
import Cart from "./Cart";  // Import the Cart component

// ================================
// Map state from Redux store to component props
// ================================
function mapStateToProps(state) {
  return {
    // Map totalCost from Redux state to prop
    totalCost: state.totalCost,

    // Map productCart array from Redux state to prop
    productCart: state.productCart
  };
}

// ================================
// Map dispatch functions (actions) to component props
// ================================
function mapDispatchToProps(dispatch) {
  return {
    // Function to dispatch "addProduct" action
    onAddProduct: (productName, productPrice) => dispatch({
      type: "addProduct",  // Action type
      productData: {       // Payload
        productName: productName,
        productPrice: productPrice
      }
    }),

    // Function to dispatch "deleteProduct" action
    onDeleteProduct: (productData) => dispatch({
      type: "deleteProduct",  // Action type
      productData: productData // Payload (entire product object)
    })
  };
}

// ================================
// Connect the Cart component to Redux
// ================================
var connectedComponent = connect(
  mapStateToProps,   // Connect state
  mapDispatchToProps // Connect dispatch actions
)(Cart);

// Export the connected component so it can be used in App.js
export default connectedComponent;
