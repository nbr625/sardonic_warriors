import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

export default class IPanel1 extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnter.bind(this)
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.resetPlayers();
            this.context.history.pushState(null, 'intro/2');
            var audio = new Audio('/music/page-flipping-sound-1.mp3');
            audio.play();
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.handler);
        var images = ["/images/snackbar.png", "/images/intro-pri-talking-left.png"];
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
            <div >
                <div>
                    <img src="/images/conference-room.png" className="intro-background"/>
                    <div className="story-text" id="first-line">Listen...A long time ago, before the Trump Calamity, deep in Redwoods,</div>
                    <div className="story-text" id="second-line">stood a place called Breakthrough...</div>
                    <audio src="/music/intro-1.mp3" autoPlay></audio>
                </div>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel1, History);
export default IPanel1;