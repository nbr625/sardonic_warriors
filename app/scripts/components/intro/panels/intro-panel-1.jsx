import React from 'react';
import { Link } from 'react-router';

export default class IPanel1 extends React.Component {
    render () {
        return (
            <div>
                <div>Once upon a time in Breakthrough</div>
                <Link to="intro/2">Next</Link>
            </div>
        );
    }
}