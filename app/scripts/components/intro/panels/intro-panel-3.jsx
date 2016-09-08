import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel3 extends React.Component {


    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnter.bind(this)
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.resetPlayers();
            this.context.history.pushState(null, 'intro/4');
            var audio = new Audio('/music/page-flipping-sound-3.mp3');
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
            <div className="intro-panel-kitchen">
                <img src="/images/kitchen.png" className="background-fade-in"/>
                <img src="/images/steve-laughing-right.png" className="intro-character-right introduced-character"/>
                <div className="story-text" id="first-line">"Just another day in paradise!" said Steve, already rippling positive</div>
                <div className="story-text" id="second-line">vibrations in the serene pond of matutine echoes and run on metaphors </div>
                <audio src="/music/intro-3.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel3, History);
export default IPanel3;