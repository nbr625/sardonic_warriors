import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel13 extends React.Component {


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
            this.context.history.pushState(null, 'intro/14');
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
                <img src="/images/conference-room.jpg" className="intro-background"/>
                <div className="story-text" id="first-line">Like a heavy handed metaphor she sought to consume the agile culture at</div>
                <div className="story-text" id="second-line">Breakthrough and incorporate it into its monolithic, outdated body</div>
                <audio src="/music/intro-13.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel13, History);
export default IPanel13;