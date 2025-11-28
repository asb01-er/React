import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

class Product extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.data.imageUrl} />
                    <hr></hr>
                    <Card.Body>
                        <Card.Title>{this.props.data.productName}</Card.Title>
                        {this.props.data.releasedDate}
                        <Rating
                            rating={this.props.data.rating}
                            numOfReviews={this.props.data.numOfReviews}
                        />
                        <br></br>
                        <Card.Text>
                        <p>{this.props.data.description}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Product;