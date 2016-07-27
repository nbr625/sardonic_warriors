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
            var audio = new Audio('/music/enter-to-select-button.mp3');
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
            <div>
                <div className="story-text">criticism and pleas of mercy. Her mouth extends forward with jagged teeth and</div>
                <div className="story-text">her pupils become slits like rips made by sarcastic intent. Her final form</div>
                <div className="story-text">is too awful. Everyone wants to ignore the even all together. But it only anger</div>
                <div className="story-text">Gayathan. She thrashes the facilities while cackling in the most unsettling way.</div>
                <audio src="/music/trex.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel5, History);
export default IPanel5;