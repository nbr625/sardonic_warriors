import React from 'react';
import { Link } from 'react-router';
import Battle from './battle.jsx';

export default class InitialTextBox extends React.Component{

    constructor(){
        super();
        this.switchText.bind(this);
        this.setState({
            activeTextIndex: 0,
            text: this.props.activeAction.initialText,
            activeText: this.state.text[this.state.activeTextIndex]
        });
    }

    switchText(){
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex,
            size = this.props.size(text);
        if (activeTextIndex < size) {
            this.setState({
                activeText: text[activeTextIndex]
            });
        } else {
            this.props.screenHandler('damageTB');
        }
    }
    render() {
        return (
            <div>
                <div id="text">{this.state.activeText}</div>
                <div onClick={this.switchText}>Next</div>
            </div>
        );
    }

}