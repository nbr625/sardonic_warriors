import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class StartScreen extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnterForStart.bind(this)
        }
    }

    pressEnterForStart(e){
        var audio = new Audio('/music/start-menu.mp3');
        if(e.keyCode == 32){
            this.props.resetPlayers();
            audio.play();
            this.context.history.pushState(null, 'intro');
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.handler);

    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.handler);
    }

    render () {

        return (
            <div className="start-screen">
                <div className="game-title">Would you like me to tell you a story?</div>
                <div className="btn btn-success"><h1>Press Space</h1></div>
                <audio src="/music/start-menu-music.mp3" autoPlay loop></audio>
            </div>
        );
    }

}


reactMixin(StartScreen, History);
export default StartScreen;