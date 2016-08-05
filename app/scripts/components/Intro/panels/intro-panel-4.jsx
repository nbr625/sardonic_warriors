import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel4 extends React.Component {


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
            var audio = new Audio('/music/page-flipping-sound-4.mp3');
            audio.play();
            this.context.history.pushState(null, 'intro/5');
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
                <div className="story-text">"Its not paradise until the bacon is done," countered Pri, who had a breach</div>
                <div className="story-text">his soul that could only be covered with processed animal fat</div>
                <audio src="/music/intro-4.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel4, History);
export default IPanel4;