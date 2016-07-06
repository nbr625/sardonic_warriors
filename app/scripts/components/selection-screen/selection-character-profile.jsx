import React from 'react';
import { Link } from 'react-router';
import SelectionScreen from './selection_screen.jsx';

export default class SelectionCharacterProfile extends React.Component {

    onSelectCharacter(){
        this.props.selectCharacter(this.props.index, this.props.player);
        this.props.updateSelectableCharacters();
    }

    render () {
        var props = this.props,
            character = props.unselectedCharacters[props.index],
            highlightedCharacters = props.characterIndexHighlighted[props.index],
            highlightStatus;
            highlightStatus = character == highlightedCharacters && props.playerHighlighted == props.player ? 'highlighted-character' : 'unhighlighted-character';
        return (
            <li className="character-profile list-group" onClick={this.onSelectCharacter.bind(this)}>
                <span className={`character-name ${highlightStatus}`}>{character.name}</span><span className="character-hp label label-default label-pill pull-xs-right">{character.maxHp}HP</span><span className="character-courage label label-default label-pill pull-xs-right"> {character.maxCourage}Courage</span>
            </li>
        );
    }
}