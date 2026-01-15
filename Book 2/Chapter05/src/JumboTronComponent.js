import React from 'react';
// Import Jumbotron and Button components from react-bootstrap library
import { Jumbotron, Button } from 'react-bootstrap';

// JumbotronComponent is a reusable component to display a prominent section
// It can display any content passed as children inside the paragraph
function JumbotronComponent(props) {
    return (
        <div>
            {/* Bootstrap Jumbotron component for a large header section */}
            <Jumbotron>
                {/* Main heading */}
                <h1>Hello, world!</h1>

                {/* Display any child content passed to the component */}
                <p>{props.children}</p>

                {/* Button that can be used to take actions like navigation */}
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </div>
    );
}

// Export the component to be used in other parts of the app
export default JumbotronComponent;
