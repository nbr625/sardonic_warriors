import React from 'react';
import { Link } from 'react-router';

export default class Intro extends React.Component {
    render () {
        return (
            <div>
                <div>The Story</div>
                <div>{this.props.children}</div>
            </div>

        );
    }
}
