import React from 'react';
import { Link } from 'react-router';
import SelectionScreen from './selection_screen.jsx'
import Game from './game.jsx'

export default class CharacterProfile extends React.Component {

    render () {
        return (
            <div className="character-profile" onClick={this.props.selectCharacter.bind(null, this.props.character)}>
                <div className="character-name">{this.props.character.name}</div>
            </div>
        );
    }
}