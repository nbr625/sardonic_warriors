import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class InitialTextBox extends React.Component{

    constructor(props,context){
        super(props, context);
        var text = this.props.activeAction.initialText;
        this.state = {
            activeTextIndex: 1,
            text: text,
            activeText: text[1]
        };
    }

    switchText(){
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex + 1,
            size = this.props.size(text);
        if (activeTextIndex < size) {
            this.setState({
                activeText: text[activeTextIndex],
                activeTextIndex: activeTextIndex
            });
        } else {
            debugger;
            this.props.screenHandler('damageTB');
        }
    }
    render() {
        return (
            <div>
                <div id="text">{this.state.activeText}</div>
                <div onClick={this.switchText.bind(this)}>Next</div>
            </div>
        );
    }

}