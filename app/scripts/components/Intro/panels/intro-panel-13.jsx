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
                <img src="/images/conference-room.png" className="intro-background"/>
                <img src="/images/gayathan-turned-1-cut.png" className="intro-character-middle character-being-introduced" id="gayathan-2"/>
                <img src="/images/story-pri-scared.png" className="intro-character-right character-being-introduced" id="first"/>
                <img src="/images/steve-terrified-left.png" className="intro-character-right character-being-introduced" id="second"/>
                <div className="story-text" id="first-line">From her mouth jagged fangs extended forward and her pupils turned into</div>
                <div className="story-text" id="second-line">evil slits. She towered over them like a corporation ready to agglomerate</div>
                <audio src="/music/intro-13.mp3" autoPlay></audio>
                <audio src="/music/trex.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel13, History);
export default IPanel13;