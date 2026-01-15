import React from 'react';
import useFetch from './useFetch'; // Custom hook to fetch data

const Users = () => {

    /*
     * Call useFetch with the API endpoint for users
     * It returns an array of user objects from the API
     */
    const users = useFetch("https://jsonplaceholder.typicode.com/users");

    return (
        <ul>
            {/* 
             * Map through the users array
             * For each user, create an <li> element
             * The 'key' prop helps React track elements efficiently
             */}
            {users.map(el => (
                <li key={el.id}>{el.name}</li>
            ))}
        </ul>
    );
}

export default Users;
