import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel16 extends React.Component {


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
            this.context.history.pushState(null, 'selection-screen');
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
            <div className="intro-panel-13">
                <img src="/images/conference-room.png" className="intro-background"/>
                <img src="/images/gayathan-turned-2.png" className="intro-character-middle" id="gayathan-1"/>
                <div className="story-text" id="first-line">After that, Gayathan destroyed Breakthrough... I have waited since</div>
                <div className="story-text" id="second-line">for someone to rewrite the scrolls of time. Are you the one?</div>
                <audio src="/music/intro-16.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel16, History);
export default IPanel16;