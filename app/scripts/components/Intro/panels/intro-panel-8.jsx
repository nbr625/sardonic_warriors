import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel8 extends React.Component {


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
            this.context.history.pushState(null, 'intro/9');
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
            <div className="intro-panel-8">
                <img src="/images/kitchen.jpg" className="intro-background"/>
                <div className="story-text" id="first-line">'It is just so much to dance!' As though to prove her claim, she proceeded</div>
                <div className="story-text" id="second-line">moved like a possessed marionette, unknowingly raising her positive charge...</div>
                <audio src="/music/intro-8.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel8, History);
export default IPanel8;