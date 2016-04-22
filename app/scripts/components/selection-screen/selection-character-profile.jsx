import React from 'react';
import { Link } from 'react-router';
import SelectionScreen from './selection-screen/selection_screen.jsx';
import Game from './game.jsx';

export default class CharacterProfile extends React.Component {

    onSelectCharacter(){
        this.props.selectCharacter(this.props.index);
    }

    render () {
        var character = this.props.characters[this.props.index];
        var disabled = (this.props.selectedCharacters.length >= 3);
        return (
            <div className="character-profile" disabled={disabled} onClick={this.onSelectCharacter.bind(this)}>
                <div className="character-name">{character.name}</div>
            </div>
        );
    }
}