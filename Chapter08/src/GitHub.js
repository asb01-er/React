import React, { Component } from 'react';
import axios from 'axios'; // npm install axios
import ReactLoading from 'react-loading';
import Card from 'react-bootstrap/Card';
import { Nav } from "react-bootstrap";

class GitHub extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: false
        };
    }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    componentDidMount() {
        this.getGitHubData('greg');
    }

    getGitHubData(_searchTerm) {
        axios.get("https://api.github.com/search/users?q=" + _searchTerm)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res.data.items
                })
                // console.log(res.data.items);
            });
    }
    render() {
        const listUsers = this.state.data.map((user) =>
            <Card key={user.id} className="shadow-lg my-3 rounded-4 text-center" style={{ width: '18rem' }}>
                <Nav.Link href={`/github/user/${user.login}/${user.id}`}>
                    <Card.Img
                        className="rounded-top"
                        src={user.avatar_url}
                        style={{ height: "180px", objectFit: "cover" }}
                    />
                </Nav.Link>

                <Card.Body>
                    <Card.Title>{user.login}</Card.Title>
                    <p className="text-muted mb-0">ID: {user.id}</p>
                </Card.Body>
            </Card>

        );

        return (
            <div>
                <h3>GitHub Users Results</h3>
                {this.state.isLoading &&
                    <ReactLoading type="spinningBubbles" color="#444" />
                }
                {listUsers}
            </div>
        );
    }
}
export default GitHub;