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
                <div className="story-text">It was a place filled with colorful characters. On such character was the</div>
                <div className="story-text">perennially happy Steve, who could he heard passing by the hall.</div>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel2, History);
export default IPanel2;