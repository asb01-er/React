import React, { useState } from 'react';
// Import star icons from react-icons library
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// Rating component accepts two props:
// - initialRating: the current rating value (1-5)
// - numOfReviews: total number of reviews to display
function Rating({ rating: initialRating, numOfReviews }) {
    // State to manage the current rating
    const [rating, setRating] = useState(initialRating);

    return (
        <div style={styles.starStyle}>
            {/* Render 5 stars */}
            {[1, 2, 3, 4, 5].map((value) =>
                // If current rating >= star value, show filled star
                rating >= value ? (
                    <IoIosStar 
                        key={value} 
                        onClick={() => setRating(value)} // Update rating when clicked
                    />
                ) : (
                    // Otherwise, show outlined star
                    <IoIosStarOutline 
                        key={value} 
                        onClick={() => setRating(value)} // Update rating when clicked
                    />
                )
            )}

            {/* Display the number of reviews next to stars */}
            <span style={{ marginLeft: 8, color: 'black' }}>
                ({numOfReviews} reviews)
            </span>
        </div>
    );
}

export default Rating;

// Inline styles object for the component
const styles = {
    starStyle: {
        color: 'orange',          // Set star color
        display: 'flex',          // Arrange stars and text in a row
        alignItems: 'center'      // Vertically center stars and review text
    }
};
