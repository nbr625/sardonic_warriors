import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel14 extends React.Component {


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
            this.context.history.pushState(null, 'intro/15');
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
            <div className="intro-panel-14">
                <img src="/images/conference-room.png" className="intro-background"/>
                <img src="/images/gayathan-turned-2.png" className="intro-character-left character-being-introduced" id="gayathan-1"/>
                <img src="/images/nico-pointing-intro.png" className="intro-character-right character-being-introduced"/>
                <div className="story-text" id="first-line">"Have no fear!", said Nico stepping forward. "This is my game and I</div>
                <div className="story-text" id="second-line">have omnipotent powers here! Fall before my might you ancient beast!" </div>
                <audio src="/music/intro-14.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel14, History);
export default IPanel14;