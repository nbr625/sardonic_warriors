import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import Game from '../../game.jsx';

export default class PlayerPanel extends React.Component {

    defend(){
        this.props.defend(this.props.activePlayer);
        this.props.screenHandler('defendTB');
    }

    meditate(){
        this.props.meditate(this.props.activePlayer);
        this.props.screenHandler('meditationTB');

    }


    render () {
        return (
            <div class="action-panel">
                <div>{this.props.activePlayer.name}</div>
                <div onClick={() => {this.props.screenHandler('attackP')}}>Attack
                    <span>&nbsp;&nbsp;</span>
                    <span onClick={() => {this.defend()}}>Defend</span>
                </div>
                <div onClick={() => {this.meditate()}}>Meditate
                    <span>&nbsp;&nbsp;</span>
                    <span onClick={() => {this.props.encourage()}}>Encourage</span>
                </div>
            </div>

        );
    }

}