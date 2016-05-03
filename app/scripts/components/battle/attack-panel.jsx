import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

export default class AttackPanel extends React.Component {

    render () {
        var props = this.props,
            attacks = props.activePlayer.attacks,
            attackOptions;
        Object.keys(attacks).map(function(key){
            if (attacks[key].type == 'damaging'){
                attackOptions =  <span onClick={props.setAction(attacks[key], props.activeActionTarget)}>{attacks[key].name}</span>;
            } else if (attacks[key].type == 'healing'){
                attackOptions = <span onClick={props.setAction(attacks[key])}>{attacks[key].name}</span>;
            }
        });

        return (
            <div>
                {attackOptions}
            </div>
        );
    }

}