import React from 'react';
import { Link } from 'react-router';
import SelectionScreen from './selection_screen.jsx';

export default class SelectionCharacterProfile extends React.Component {

    onSelectCharacter(){
        this.props.selectCharacter(this.props.index, this.props.player);
    }

    render () {
        var unselectedChars = this.props.unselectedChars,
            character = unselectedChars[this.props.index];
        return (
            <li className="character-profile" onClick={this.onSelectCharacter.bind(this)}>
                <span className="character-name">{character.name}</span>
            </li>
        );
    }
}