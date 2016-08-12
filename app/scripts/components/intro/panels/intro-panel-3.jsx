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
                <img src="/images/kitchen.png" className="intro-background"/>
                <img src="/images/steve-laughing-right.png" className="intro-character-right"/>
                <div className="story-text" id="first-line">"Just another day in paradise!" said Steve, as though he was a smith on a</div>
                <div className="story-text" id="second-line">mission to melt away the yesterday and solder the realities of a new day.</div>
                <audio src="/music/intro-3.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel3, History);
export default IPanel3;