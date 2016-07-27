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
                <div>
                    <div className="story-text">Legends talk about a place called Breakthrough, where the crew slowly filter into the building.</div>
                    <div className="story-text">The perinially joyous David marks the day. 'Another day in Paradise', he crows. At the</div>
                    <div className="story-text">kitchen many can be seen waiting for their turn at the coffee altar. Gayathri can be</div>
                    <div className="story-text">spotted there, making loud, indistinguishable noises, which could be interpreted as:</div>
                </div>
                <div className="story-next-button">Press Enter</div>
            </div>
        );
    }
}

reactMixin(IPanel1, History);
export default IPanel1;