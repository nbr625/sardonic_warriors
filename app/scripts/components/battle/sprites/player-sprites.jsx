import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import PlayerSpritePanel from './player-sprite-panel.jsx';

class PlayerSprite extends React.Component{

    renderSprite() {
        var props = this.props,
            player = props.player,
            character;

        switch(player) {
            case 1:
                character = props.firstCharacter;
                break;
            case 2:
                character = props.secondCharacter;
                break;
            case 3:
                character = props.thirdCharacter;
                break;
        }



        var attackingCharacterSprite = "/images/" + character.name.toLowerCase() + "_attacking.png",
            selectedCharacterSprite = "/images/" + character.name.toLowerCase() + "_selected.png",
            standingCharacterSprite = "/images/" + character.name.toLowerCase() + "_standing.png",
            dyingCharacterSprite = "/images/" + character.name.toLowerCase() + "_dying.png",
            revivingCharacterSprite = "/images/" + character.name.toLowerCase() + "_reviving.png",
            hurtCharacterSprite = "/images/" + character.name.toLowerCase() + "_hurt.png",
            deadCharacterSprite = "/images/" + character.name.toLowerCase() + "_dead.png",
            attackingCharacter = {backgroundImage: 'url(' + attackingCharacterSprite + ')'},
            selectedCharacter = {backgroundImage: 'url(' + selectedCharacterSprite + ')'},
            standingCharacter = {backgroundImage: 'url(' + standingCharacterSprite + ')'},
            dyingCharacter = {backgroundImage: 'url(' + dyingCharacterSprite + ')'},
            revivingCharacter = {backgroundImage: 'url(' + revivingCharacterSprite + ')'},
            hurtCharacter = {backgroundImage: 'url(' + hurtCharacterSprite + ')'},
            deadCharacter = {backgroundImage: 'url(' + deadCharacterSprite + ')'},
            playerString = player.toString();

        if(props.dyingCharacter == player) {
            return <div style={dyingCharacter} className={`dying-character dying-${playerString}`}></div>;
        } else if(props.attackingCharacter == player) {
            return <div style={attackingCharacter} className={`attacking-character attack-${playerString}`}></div>;
        } else if(props.selectedCharacter == player) {
            return <div style={selectedCharacter} className={`selected-character select-${playerString}`}></div>;
        } else if(props.hurtCharacter == player) {
            return <div style={hurtCharacter} className={`hurt-character hurt-${playerString}`}></div>;
        } else if(props.revivingCharacter  == player) {
            return <div style={revivingCharacter} className={`reviving-character reviving-${playerString}`}></div>;
        } else if(character.status == 'dead'){
            return <div style={deadCharacter} className={`dead-character dead-${playerString}`}></div>;
        } else {
            return <div style={standingCharacter} className={`standing-character standing-${playerString}`}></div>;
        }
    }

    render() {
        var props = this.props,
            character;

        switch(props.player) {
            case 1:
                character = props.firstCharacter;
                break;
            case 2:
                character = props.secondCharacter;
                break;
            case 3:
                character = props.thirdCharacter;
                break;
        }

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