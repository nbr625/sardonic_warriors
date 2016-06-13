import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class CharacterDamageTextBox extends React.Component{


    nextPanel(){
        if(this.props.activeActionTarget.status == 'dead'){
            return this.props.screenHandler('characterD', this.props.activeActionTarget);
        } else {
            return this.props.setNextTurn();
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
                <div id="text">{text}</div>
                <div onClick={() => {this.nextPanel()}}>Continue</div>
            </div>
        );
    }
}
