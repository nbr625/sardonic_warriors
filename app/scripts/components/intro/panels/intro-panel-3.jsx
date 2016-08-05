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
            <div>
                <div className="story-text">"Just another day in paradise!" said Steve, as though he was a smith on a</div>
                <div className="story-text">mission to melt away the yesterday and solder the realities of a new day.</div>
                <audio src="/music/intro-3.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
                <audio src="/music/thunder.mp3" autoPlay></audio>
            </div>
        );
    }
}

reactMixin(IPanel3, History);
export default IPanel3;