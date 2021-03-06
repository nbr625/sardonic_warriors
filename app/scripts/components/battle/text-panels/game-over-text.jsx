import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class GameOverPanel extends React.Component{

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
            this.context.history.pushState(null, 'game-over');
        }
    }

    render() {
        return (
            <div>
                <div className="battle-text-box-text" id="gayathan">{this.props.lastKilledCharacter.name} died. How sad...</div>
                <div className="text-enter-button" id="gayathan">Press Enter</div>
            </div>
        );
    }
}

export default GameOverPanel;
reactMixin(GameOverPanel, History);
