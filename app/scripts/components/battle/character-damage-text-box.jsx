import React from 'react';
import { Link } from 'react-router';
import Battle from './battle.jsx';

export default class CharacterDamageTextBox extends React.Component{

    render() {
        var props = this.props,
            activeActionTarget = props.activeActionTarget,
            activePlayer = props.activePlayer,
            damage = this.damage(),
            text = '';

        switch(this.props.activeAction.type){
            case 'damaging':
                text = "${activeActionTarget} takes ${damage()}";
                break;
            case 'heal':
                text = "${activePlayer} restores ${activeActionTarget.name}\'s morale by {activeAction.restoration}";
                break;
        }
        props.actionHandler(this.props.activeAction, this.props.activeActionTarget);

        if(this.props.activeActionTarget == 'dead'){
            return this.props.screenHandler('characterD', this.props.activeActionTarget);
        } else {
            return this.props.screenHandler('finalTB');
        }

        return (
            <div>
                <div id="text">{text}</div>
                <div onClick={this.props.screenHandler('finalTB')}>Next</div>
            </div>
        );
    }

}
