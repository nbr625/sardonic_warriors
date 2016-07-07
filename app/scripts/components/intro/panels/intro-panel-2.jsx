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
                <div className="story-text">
                    Synchronized with the burbling of the coffee machine, the isotopic charges crack the sky.
                </div>
                <div className="story-text">
                    It hungers for a high energy source to stabilize itself. "Everyone can tell that Bollywood music,
                </div>
                <div className="story-text">
                    trumps all other genres. It is just so much to dance," She says to a crowd that was not talking about dancing.
                </div>
                <div className="story-text">
                    As if to corroborate her point, she flails about like a possessed marionette. The cloud has found its target.
                </div>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel2, History);
export default IPanel2;