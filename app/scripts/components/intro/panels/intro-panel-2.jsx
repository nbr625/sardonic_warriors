import React from 'react';
import { Link } from 'react-router';

export default class IPanel2 extends React.Component {
    render () {
        return (
            <div>
                <div>Gayathan was struck by lightning</div>
                <Link to="intro/3">Next</Link>
            </div>
        );
    }
}
