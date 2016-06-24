import React from 'react';
import { Link } from 'react-router';
import Game from '../../game.jsx';
import Battle from '../battle.jsx';
import AttackPanel from './attack-panel.jsx'

export default class AttackBox extends React.Component {


    render () {
        var props = this.props,
            attack = props.attacks[this.props.index],
            attackBox;

        if (attack.type === 'damaging') {
            attackBox = <span onClick={() => {props.setAction(attack, props.boss) }}>{attack.name}</span>
        } else {
            attackBox = <span onClick={() => {props.setAction(attack)}}>{attack.name}</span>
        }


        return (
            <div className="btn btn-danger single-attack-box">
                {attackBox}
                <span>{attack.courageCost}</span>
            </div>
        );
    }

}