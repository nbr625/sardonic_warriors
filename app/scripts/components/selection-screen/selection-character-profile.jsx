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
            <li className="character-profile list-group" onClick={this.onSelectCharacter.bind(this)}>
                <span className="character-name">{character.name}</span><span className="character-hp label label-default label-pill pull-xs-right">{character.maxHp}HP</span><span className="character-courage label label-default label-pill pull-xs-right"> {character.maxCourage}Courage</span>
            </li>
        );
    }
}