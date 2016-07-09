import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class PlayerSpritePanel extends React.Component{


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
                <div className="battle-text-box-text">{text}</div>
                <div>Press Enter</div>
            </div>
        );
    }
}

export default PlayerSpritePanel;
reactMixin(PlayerSpritePanel, History);