import React from 'react';
import { Link } from 'react-router';
import Game from './game.jsx';
import SelectionScreen from './selection_screen.jsx';

export default class SelectedCharacterPanel extends React.Component {

    render () {
        return (
            <div className="character-panel" onclick={this.props.unselectCharacter.bind(null, this.props.selectedCharacter)}>
                <div className="character-name">{this.props.selectedCharacter.name}</div>
            </div>
        );
    }

}