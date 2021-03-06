import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class EncourageTextBox extends React.Component{

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
            this.props.setNextTurn();
        }
    }

    render() {
        return (
            <div>
                <div className="battle-text-box-text" id="healing">{this.props.activePlayer.name + " remind " + this.props.activeActionTarget.name + " that he will die someday. But today is not that day."}</div>
                <div className="battle-text-box-text" id="healing">{this.props.activeActionTarget.name + " is encouraged by this cryptic statement."}</div>
                <div className="text-enter-button" id="healing">Press Enter</div>
            </div>
        );
    }
}

export default EncourageTextBox;
reactMixin(EncourageTextBox, History);