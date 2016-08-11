import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel2 extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnter.bind(this)
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.resetPlayers();
            this.context.history.pushState(null, 'intro/3');
            var audio = new Audio('/music/page-flipping-sound-2.mp3');
            audio.play();
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
                <img src="/images/conference-room.png" className="intro-background"/>
                <img src="/images/steve-laughing-right.png" className="intro-character-left"/>
                <div className="story-text" id="first-line">It was a place filled with colorful characters. One such character was the</div>
                <div className="story-text" id="second-line">perennially happy Steve, who could he heard passing by the halls.</div>
                <audio src="/music/intro-2.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel2, History);
export default IPanel2;