import React from 'react';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

function Product({ data }) {

    // Product component receives a "data" object as props
    // This object contains all information needed to display a product
    return (
        <div>

            {/* Card component used to display product details */}
            <Card style={{ width: '18rem' }}>

                {/* Display product image from props */}
                <Card.Img variant="top" src={data.imageUrl} />

                <hr />

                <Card.Body>

                    {/* Display product name */}
                    <Card.Title>{data.productName}</Card.Title>

                    {/* Display product release date */}
                    {data.releasedDate}

                    {/* 
                      Pass rating-related data to the Rating component
                      This allows Rating to display stars and reviews dynamically
                    */}
                    <Rating
                        rating={data.rating}
                        numOfReviews={data.numOfReviews}
                    />

                    <br />

                    {/* Display product description */}
                    <Card.Text>
                        <p>{data.description}</p>
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    );
}

export default Product;
