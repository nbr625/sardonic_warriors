import React from 'react';
import { Link } from 'react-router';

export default class StartScreen extends React.Component {
    render () {
        return (
            <Link to="intro"><h1>Press Start</h1></Link>
        );
    }
}
