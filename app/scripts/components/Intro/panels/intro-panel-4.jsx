import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel4 extends React.Component {


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
            var audio = new Audio('/music/enter-to-select-button.mp3');
            audio.play();
            this.context.history.pushState(null, 'intro/5');
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
            <div>
                <div className="story-text">target Gayathri floods the room with blinding incandescence. Her cells charge with</div>
                <div className="story-text">the unstable power. Her cells remember a prehistoric anatomical structure and</div>
                <div className="story-text">begin to approximate this forgotten vessel. It fills her with sarcastic might!</div>
                <div className="story-text">Her skin hardens and segments into scales, she is even more resilient to the</div>
                <audio src="/music/trex.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel4, History);
export default IPanel4;