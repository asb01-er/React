import React from 'react';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

function Product({ data }) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.imageUrl} />
                <hr />
                <Card.Body>
                    <Card.Title>{data.productName}</Card.Title>
                    {data.releasedDate}

                    <Rating
                        rating={data.rating}
                        numOfReviews={data.numOfReviews}
                    />

                    <br />
                    <Card.Text>
                        <p>{data.description}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Product;
