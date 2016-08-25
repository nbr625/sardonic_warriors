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

        let playerStyle = '';
        let playerClass = '';

        if(props.dyingCharacter == player) {
            playerStyle = dyingCharacter;
            playerClass = `dying-character dying-${playerString}`;
        } else if(props.attackingCharacter == player) {
            playerStyle = attackingCharacter;
            playerClass = `attacking-character attack-${playerString}`;
        } else if(props.selectedCharacter == player) {
            playerStyle = selectedCharacter;
            playerClass = `selected-character select-${playerString}`;
        } else if(props.hurtCharacter == player) {
            playerStyle = hurtCharacter;
            playerClass = `hurt-character hurt-${playerString}`
        } else if(props.revivingCharacter  == player) {
            playerStyle = revivingCharacter;
            playerClass = `reviving-character reviving-${playerString}`;
        } else if(character.status == 'dead'){
            playerStyle = deadCharacter;
            playerClass = `dead-character dead-${playerString}`;
        } else {
            playerStyle = standingCharacter;
            playerClass = `standing-character standing-${playerString}`
        }

        return <div id={playerString} style={playerStyle} className={playerClass}></div>;
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
                <div className="character-name-text">{character.name}</div>
                {this.renderSprite()}
            </div>
        );
    }
}

export default PlayerSprite;
reactMixin(PlayerSprite, History);