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
                <div className="btn btn-danger btn-attack" onClick={() => {this.props.screenHandler('attackP')}}>Attack</div>
                <div className="btn btn-warning btn-defend" onClick={() => {this.defend()}}>Defend</div>
                <div className="btn btn-info btn-meditate" onClick={() => {this.meditate()}}>Meditate</div>
                <div className="btn btn-primary btn-encourage" onClick={() => {this.props.screenHandler('selectET')}}>Encourage</div>

            </div>

        );
    }

}