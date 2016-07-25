import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class DefendTextBox extends React.Component{

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
        var text = this.props.activePlayer.name + " sings to himself: \"I am beautiful, in every single way! Words can\'t break me down! Nooooo!\" Everyone seems embarrassed for him, but he is more resilient to verbal abuse by 50 points";
        return (
            <div>
                <div className="battle-text-box-text">{text}</div>
                <div>Press Enter</div>
            </div>
        );
    }
}

export default DefendTextBox;
reactMixin(DefendTextBox, History);