import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class VictoryPanel extends React.Component{

    constructor(props,context){
        super(props, context);
        this.state = {
            enterHandler: this.pressEnter.bind(this)
        };
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.enterHandler);

    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.context.history.pushState(null, 'victory');
        }
    }

    render() {
        return (
            <div>
                <div className="battle-text-box-text">Gayathan collapses to the ground she seems to be unconcious</div>
                <div className="text-enter-button">Press Enter</div>
                <audio src="/music/victory-chime.mp3" autoPlay loop></audio>
            </div>
        );
    }
}

export default VictoryPanel;
reactMixin(VictoryPanel, History);
