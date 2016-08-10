import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel10 extends React.Component {


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
            this.context.history.pushState(null, 'intro/11');
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
            <div className="intro-panel-10">
                '<img src="/images/conference-room.jpg" className="intro-background"/>
                <div className="story-text" id="first-line">The room filled with blinding incandescence. To contain the incredible surge</div>
                <div className="story-text" id="second-line">of negative energy, Gayathri's body had to morphed at the cellular level.</div>
                <audio src="/music/intro-10.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel10, History);
export default IPanel10;