import React from 'react';
import { Link } from 'react-router';
import Battle from './battle.jsx';
import Game from '../game.jsx';

export default class PlayerPanel extends React.Component {


    render () {
        return (
            <div class="action-panel">
                <div onClick={this.props.screenHandler('attackP')}>Attack</div>
                <div onClick={this.props.defend(this.props.activePlayer)}>Defend</div>
                <div onClick={this.props.meditate(this.props.activePlayer)}>Meditate</div>
                <div onClick={this.props.encourage}>Encourage</div>
            </div>

        );
    }

}