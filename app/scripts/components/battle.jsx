import React from 'react';
import { Link } from 'react-router';

export default class Battle extends React.Component {
    render () {
        return (
            <div>
                <h1>The Showdown!</h1>
                <div>{Object.keys(this.props.selectedCharacters).map(this.props.renderSprites)}</div>
            </div>

        );
    }
}
