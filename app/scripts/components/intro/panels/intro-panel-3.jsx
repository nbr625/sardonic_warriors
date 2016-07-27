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
                <div className="story-text">trumps all other genres. It is just so much to dance," She says to a crowd that was</div>
                <div className="story-text">not talking about dancing. As if to corroborate her point, she flails about like a</div>
                <div className="story-text">possessed marionette. The cloud has found its target. Lightning precipitates down</div>
                <div className="story-text">to the unsuspecting dancer. It takes less than a second to reach the unsuspecting</div>
                <div className="story-next-button">Press Enter</div>
                <audio src="/music/thunder.mp3" autoPlay></audio>
            </div>
        );
    }
}

reactMixin(IPanel3, History);
export default IPanel3;