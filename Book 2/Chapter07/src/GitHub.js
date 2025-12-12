import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Card from 'react-bootstrap/Card';

function GitHub() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
            setData(res.data.items || []);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getData();
    };

    const listUsers = data.map((user) => (
        <Card
            key={user.id}
            className="shadow-lg my-3 rounded-4 text-center"
            style={{ width: '18rem' }}
        >
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
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
    ));

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h3>GitHub Users Results</h3>

            {isLoading && (
                <ReactLoading type="spinningBubbles" color="#444" />
            )}

            {listUsers}
        </div>
    );
}

export default GitHub;
