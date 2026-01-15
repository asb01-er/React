import { useState, useEffect } from 'react';

const useFetch = (url) => {

    // Holds the data returned from the API
    const [data, setData] = useState([]);

    /*
     * useEffect runs every time the 'url' value changes.
     * This allows the component to automatically re-fetch data
     * whenever a new endpoint is requested.
     */
    useEffect(() => {
        
        // Fetch the data from the API
        fetch(url)
            .then(response => response.json())  // Convert response to JSON
            .then(data => setData(data));        // Save the data to state

        /*
         * Dependency array: [url]
         * Means this effect runs ONLY when the 'url' changes.
         */
    }, [url]);

    // Return the fetched data so the component can use it
    return data;
}

export default useFetch;
