import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class MeditationTextBox extends React.Component{

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
                <div className="battle-text-box-text" id="healing">{this.props.activePlayer.name + " thinks about the fact that he is statistical miracle that could end at any moment that"}</div>
                <div className="battle-text-box-text" id="healing">{"the universal die stops rolling in his favor. The thought somehow encourages him. Weirdo."}</div>
                <div className="text-enter-button" id="healing">Press Enter</div>
            </div>
        );
    }
}

export default MeditationTextBox;
reactMixin(MeditationTextBox, History);