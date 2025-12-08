import React, { Component } from 'react';
import axios from 'axios'; // npm install axios
import ReactLoading from 'react-loading';
import Card from 'react-bootstrap/Card';

class GitHub extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: true
        };
    }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    // componentDidMount() {
    //     this.getGitHubData('greg');
    // }
    
    // Search form with handleChange + handleSubmit
    // Controlled components update searchTerm state on every keypress.
    // Loader state (isLoading)
    // Shows spinner while waiting for API response.
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
                <a href={user.html_url}>
                    <Card.Img
                        className="rounded-top"
                        src={user.avatar_url}
                        style={{ height: "180px", objectFit: "cover" }}
                    />
                </a>

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