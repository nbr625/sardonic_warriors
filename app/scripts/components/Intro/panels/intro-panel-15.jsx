import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel15 extends React.Component {


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
            this.context.history.pushState(null, 'intro/16');
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
                <img src="/images/conference-room.jpg" className="intro-background"/>
                <div className="story-text" id="first-line">The beast surprised him by breathing fire and roasting him. He was forced</div>
                <div className="story-text" id="second-line">to enter enter an emergency nap, rendering him out of action.</div>
                <audio src="/music/intro-14.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );e
    }
}

reactMixin(IPanel15, History);
export default IPanel15;