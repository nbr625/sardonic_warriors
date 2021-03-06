import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel5 extends React.Component {


    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnter.bind(this)
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.resetPlayers();
            this.props.updateSelectableCharacters();
            var audio = new Audio('/music/page-flipping-sound-5.mp3');
            audio.play();
            this.context.history.pushState(null, 'intro/6');
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
            <div className="intro-panel-5">
                <img src="/images/brewing-storm.png" className="background-fade-in"/>
                <div className="story-text" id="first-line">Neither of them imagined that thousands of feet above them, an easter</div>
                <div className="story-text" id="second-line">wind blew a fulminating storm of radioactive smog.</div>
                <audio src="/music/intro-5.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel5, History);
export default IPanel5;