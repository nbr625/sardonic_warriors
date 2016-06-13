import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

export default class StartScreen extends React.Component {
    render () {
        return (
            <div className="start-screen">
                <div className="game-title">Sardonic Warriors</div>
                <Link className="btn btn-success" onClick={this.props.resetPlayers} to="intro" ><h1>Press Start</h1></Link>
            </div>
        );
    }

}
