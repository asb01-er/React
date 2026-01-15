import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Card from 'react-bootstrap/Card';

function GitHub() {
    // State to store GitHub user data fetched from API
    const [data, setData] = useState([]);
    // State to store the search term entered by the user
    const [searchTerm, setSearchTerm] = useState("");
    // State to track loading status for API requests
    const [isLoading, setIsLoading] = useState(false);

    // useEffect runs once when the component mounts to fetch initial data
    useEffect(() => {
        getData();
    }, []);

    // Function to fetch GitHub users based on the search term
    const getData = async () => {
        setIsLoading(true); // Start loading
        try {
            // Make GET request to GitHub API search endpoint
            const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
            // Store the array of users in state, default to empty array if none
            setData(res.data.items || []);
        } catch (error) {
            console.error(error); // Log any errors
        }
        setIsLoading(false); // Stop loading
    };

    // Handle form submission when the user searches
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        getData(); // Fetch data based on current searchTerm
    };

    // Map over the fetched data to display each user in a Bootstrap Card
    const listUsers = data.map((user) => (
        <Card
            key={user.id} // Unique key for React list
            className="shadow-lg my-3 rounded-4 text-center"
            style={{ width: '18rem' }}
        >
            {/* Link to GitHub profile */}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <Card.Img
                    className="rounded-top"
                    src={user.avatar_url} // Display user's avatar
                    style={{ height: "180px", objectFit: "cover" }}
                />
            </a>

            <Card.Body>
                <Card.Title>{user.login}</Card.Title> {/* Username */}
                <p className="text-muted mb-0">ID: {user.id}</p> {/* User ID */}
            </Card.Body>
        </Card>
    ));

    return (
        <div>
            {/* Search form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search GitHub users..."
                    onChange={(event) => setSearchTerm(event.target.value)} // Update searchTerm as user types
                />
                <button type="submit">Search</button>
            </form>

            <h3>GitHub Users Results</h3>

            {/* Show loading spinner while fetching data */}
            {isLoading && (
                <ReactLoading type="spinningBubbles" color="#444" />
            )}

            {/* Display list of user cards */}
            {listUsers}
        </div>
    );
}

export default GitHub;
