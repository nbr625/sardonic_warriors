import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel7 extends React.Component {


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
            this.context.history.pushState(null, 'intro/8');
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
            <div className="intro-panel-7">
                <img src="/images/kitchen.png" className="intro-background"/>
                <img src="/images/gayathri-talking-1.png" className="intro-character-middle character-being-introduced"/>
                <div className="story-text" id="first-line">'I still think that Bollywood music is the best genre of music', Gayathri</div>
                <div className="story-text" id="second-line">explained to a crowd that had not been talking about Bollywood, at all.</div>
                <audio src="/music/intro-7.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel7, History);
export default IPanel7;