import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';
import CharacterSprite from '../character-sprite.jsx'

export default class SelectedCharacterPanel extends React.Component {

    render () {
        return (
            <span className="character-panel">
                {Object.keys(this.props.selectedCharacters).map(this.props.renderSprites)}
            </span>
        );
    }

}
