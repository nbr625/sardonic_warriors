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
                <div className="story-text">'I am alive! hear me roar!' Meanwhile, hundred of meters  above the clouds, the clash</div>
                <div className="story-text">between human-made pollution and barometric pressure brews a pocket storm. Synchronized</div>
                <div className="story-text"> with the burbling of the coffee machine, the isotopic charges crack the sky. It hungers</div>
                <div className="story-text">for a high energy source to stabilize itself. "Everyone can tell that Bollywood music,</div>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel2, History);
export default IPanel2;