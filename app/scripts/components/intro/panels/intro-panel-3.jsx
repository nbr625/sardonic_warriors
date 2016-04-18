import React from 'react';
import { Link } from 'react-router';

export default class IPanel3 extends React.Component {
    render () {
        return (
            <div>
                <div>Can you defeat the terror?</div>
                <Link to="selection-screen">Next</Link>
            </div>
        );
    }
}