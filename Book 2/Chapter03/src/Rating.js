// Import React and the useState hook for managing component state
import React, { useState } from 'react';

// Import star icons (filled and outline) from react-icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// Rating functional component
// This component allows users to select a rating from 1 to 5 stars
function Rating(props) {

    // Local state to store the current rating value
    // rating  -> current selected rating
    // setRating -> function used to update the rating
    const [rating, setRating] = useState(0);

    // JSX that defines what appears on the screen
    return (
        <div>

            {/* Display the current rating value */}
            <h1>Rating: {rating}</h1>

            {/* 
              STAR 1
              If rating is 1 or more, show a filled star
              Otherwise, show an empty star
              Clicking the star updates the rating to 1
            */}
            {rating >= 1 ? (
                <IoIosStar onClick={() => setRating(1)} />
            ) : (
                <IoIosStarOutline onClick={() => setRating(1)} />
            )}

            {/* STAR 2 */}
            {rating >= 2 ? (
                <IoIosStar onClick={() => setRating(2)} />
            ) : (
                <IoIosStarOutline onClick={() => setRating(2)} />
            )}

            {/* STAR 3 */}
            {rating >= 3 ? (
                <IoIosStar onClick={() => setRating(3)} />
            ) : (
                <IoIosStarOutline onClick={() => setRating(3)} />
            )}

            {/* STAR 4 */}
            {rating >= 4 ? (
                <IoIosStar onClick={() => setRating(4)} />
            ) : (
                <IoIosStarOutline onClick={() => setRating(4)} />
            )}

            {/* STAR 5 */}
            {rating >= 5 ? (
                <IoIosStar onClick={() => setRating(5)} />
            ) : (
                <IoIosStarOutline onClick={() => setRating(5)} />
            )}

        </div>
    );
}

// Export Rating so it can be reused in other components
export default Rating;
