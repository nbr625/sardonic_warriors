import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class PlayerSprite extends React.Component{

    renderSprite(){
        var props = this.props,
            attackingCharacter = {backgroundImage: "/images/" + character.name.toLowerCase() + "_standing.png"},
            selectedCharacter = {backgroundImage: "/images/" + character.name.toLowerCase() + "_selected.png"},
            standingCharacter = {backgroundImage: "/images/" + character.name.toLowerCase() + "_stading.png"};

        if (props.attackingCharacter == props.player) {
            return <div style={attackingCharacter} className="attacking-character"></div>;
        } else if(props.selectedCharacter == props.player) {
            return <div style={selectedCharacter} className="selected-character"></div>;
        } else{
            return <div style={standingCharacter} className="standing-character"></div>;
        }
    }

    render() {
        var props = this.props,
            activeActionTarget = props.activeActionTarget,
            activePlayer = props.activePlayer,
            text = '';

        switch(this.props.activeAction.type){
            case 'damaging':
                text = activeActionTarget.name + " takes " + props.lastDamage + " points of damage";
                break;
            case 'healing':
                text = activePlayer.name + " restores " + activeActionTarget.name + "\'s morale by " + props.lastHeal;
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