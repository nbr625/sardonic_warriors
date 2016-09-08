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
                <div className="game-title">Oh... Hi! Would you like me to hear my story?</div>
                <div className="game-title-press-space">Press Space</div>
                <audio id="background-music" src="/music/start-menu-music.mp3" autoPlay loop></audio>
                <audio id="narration" src="/music/tell-you-a-story.mp3" autoPlay></audio>
                <div className="hidden-image">
                    <img src="/images/conference-room.png"/>
                    <img src="/images/kitchen.png"/>
                    <img src="/images/steve-laughing-right.png"/>
                    <img src="/images/partchment-horizontal-background.png"/>
                    <img src="/images/snackbar.png"/>
                    <img src="/images/intro-pri-talking-left.png"/>
                    <img src="/images/thunder-clouds.png"/>
                    <img src="/images/gayathan-turning-0.png"/>
                    <img src="/images/gayathan-turning.png"/>
                    <img src="/images/gayathan-turned-2.png"/>
                    <img src="/images/gayathan-turned-1-cut.png"/>
                    <img src="/images/story-pri-scared.png"/>
                    <img src="/images/steve-terrified-left.png"/>
                </div>
            </div>
        );
    }

}


reactMixin(StartScreen, History);
export default StartScreen;