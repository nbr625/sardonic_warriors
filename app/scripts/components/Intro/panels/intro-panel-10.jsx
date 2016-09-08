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
                '<img src="/images/kitchen.png" className="intro-background"/>
                <img src="/images/gayathan-turning-0.png" className="intro-character-middle character-being-introduced"/>
                <div className="story-text" id="first-line">The bolt struck Gayathri and flooded the room with blinding incandescence.</div>
                <div className="story-text" id="second-line">To contain the charge of negative energy, Gayathri's body had to change...</div>
                <audio src="/music/intro-10.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel10, History);
export default IPanel10;