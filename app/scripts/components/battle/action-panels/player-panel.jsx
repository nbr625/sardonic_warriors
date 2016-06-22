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
                <div className="btn btn-warning" onClick={() => {this.props.screenHandler('attackP')}}>Attack</div>
                <div className="btn btn-danger" onClick={() => {this.defend()}}>Defend</div>
                <div className="btn btn-info" onClick={() => {this.meditate()}}>Meditate</div>
                <div className="btn btn-success" onClick={() => {this.props.screenHandler('selectET')}}>Encourage</div>

            </div>

        );
    }

}