import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class StartScreen extends React.Component {
    render () {

        document.body.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                this.props.resetPlayers();
                this.context.history.pushState(null, 'intro');
            }
        });
        return (
            <div className="start-screen">
                <div className="game-title">Sardonic Warriors</div>
                <Link className="btn btn-success" onClick={this.props.resetPlayers} to="intro" ><h1>Press Enter</h1></Link>
                <audio src="/music/dubstep-intro.mp3" autoPlay loop></audio>
            </div>
        );
    }

}


reactMixin(StartScreen, History);
export default StartScreen;