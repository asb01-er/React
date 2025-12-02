import React, { Component } from 'react';
import axios from 'axios'; // npm install axios
import ReactLoading from 'react-loading';

class GitHub extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: true
        };
    }
    getGitHubData(_searchTerm) {
        axios.get("https://api.github.com/search/users?q=" + _searchTerm)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res.data.items
                })
                console.log(res.data.items);
            });
    }
    render() {
        return (
            <div>
                {this.state.isLoading &&
                    <ReactLoading type="spinningBubbles" color="#444" />
                }
            </div>
        );
    }
}
export default GitHub;