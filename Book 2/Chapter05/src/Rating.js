import React, { useState } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

function Rating({ rating: initialRating, numOfReviews }) {
    const [rating, setRating] = useState(initialRating);

    return (
        <div style={styles.starStyle}>
            {/* Stars */}
            {[1, 2, 3, 4, 5].map((value) =>
                rating >= value ? (
                    <IoIosStar key={value} onClick={() => setRating(value)} />
                ) : (
                    <IoIosStarOutline key={value} onClick={() => setRating(value)} />
                )
            )}

            {/* Number of reviews */}
            <span style={{ marginLeft: 8, color: 'black' }}>
                ({numOfReviews} reviews)
            </span>
        </div>
    );
}

export default Rating;

const styles = {
    starStyle: {
        color: 'orange',
        display: 'flex',
        alignItems: 'center'
    }
};
