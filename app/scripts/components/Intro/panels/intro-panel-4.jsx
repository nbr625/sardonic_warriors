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
        var images = ["/images/gayathan-turned-2.png", "/images/gayathan-turned-1-cut.png"];
        images.forEach((src) => {
            const img = document.createElement('img');
            img.src = src;
        });

    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.handler);
    }

    render () {

        return (
            <div>
                <img src="/images/snackbar.png" className="intro-background"/>
                <img src="/images/steve-laughing-right.png" className="intro-character-left"/>
                <img src="/images/intro-pri-talking-left.png" className="intro-character-right"/>
                <div className="story-text" id="first-line">"Its not paradise until the bacon is done," countered Pri, who had a breach</div>
                <div className="story-text" id="second-line">his soul that could only be covered with processed animal fat</div>
                <audio src="/music/intro-4.mp3" autoPlay></audio>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel4, History);
export default IPanel4;