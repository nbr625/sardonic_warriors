import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Link } from 'react-router';
import SelectionScreen from './selection-screen/selection_screen.jsx';
import Game from './game.jsx';
import SelectedCharacterPanel from './selection-screen/selected-character-panel.jsx';

export default class CharacterSprite extends React.Component {

    render () {
        var character = this.props.selectedCharacters[this.props.index];
        return (
            <div className="character-name" onclick={this.props.unselectCharacter(this.props.index)}>{character.name}</div>

        );
    }
}