import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import PlayerSpritePanel from './player-sprite-panel.jsx';

class PlayerSprite extends React.Component{

    renderSprite(){
        var props = this.props,
            character = props.character,
            attackingCharacterSprite = "/images/" + character.name.toLowerCase() + "_attacking.png",
            selectedCharacterSprite = "/images/" + character.name.toLowerCase() + "_selected.png",
            attackingCharacter = {backgroundImage: 'url(' + attackingCharacterSprite + ')' },
            selectedCharacter = {backgroundImage: 'url(' + selectedCharacterSprite + ')'},
            playerString = character.player.toString();

        if (props.attackingCharacter == props.player) {
            return <div style={attackingCharacter} className={`attacking-character attack-${playerString}`}></div>;
        } else if(props.selectedCharacter == props.player) {
            return <div style={selectedCharacter} className={`selected-character`}></div>;
        } else{
            return <img className={`standing-character player-${playerString}`} src={"/images/" + character.name.toLowerCase() + "_standing.png"}/>;
        }
    }

    render() {
        var props = this.props,
            character = props.character;


        return (
            <div>
                <div>{character.name} </div>
                {this.renderSprite()}
            </div>
        );
    }
}

export default PlayerSprite;
reactMixin(PlayerSprite, History);