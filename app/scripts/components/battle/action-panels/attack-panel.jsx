import React from 'react';
import { Link } from 'react-router';
import Game from '../../game.jsx';
import Battle from '../battle.jsx';
import AttackBox from './attack-box.jsx'

export default class AttackPanel extends React.Component {


    render () {
        var props = this.props,
            attacks = props.activePlayer.attacks;

        return (
            <div>
                {Object.keys(attacks).map(function(key){
                    return <AttackBox key={key} index={key} setAction={props.setAction} attacks={attacks} />;
                })}
            </div>
        );
    }

}