import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel11 extends React.Component {


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
            this.context.history.pushState(null, 'intro/12');
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
            <div className="intro-panel-11">
                <img src="/images/conference-room.png" className="intro-background"/>
                <img src="/images/gayathan-turning.png" className="intro-character-middle character-being-introduced"/>
                <div className="story-text" id="first-line">Out of desperation, her DNA summoned a sturdier vessel, cast away long</div>
                <div className="story-text" id="second-line">before history. Her fleshy human skin segmented and hardened into scales</div>
                <audio src="/music/intro-11.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel11, History);
export default IPanel11;