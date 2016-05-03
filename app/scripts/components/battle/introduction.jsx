import React from 'react';
import { Link } from 'react-router';
import Battle from './battle.jsx';

export default class Introduction extends React.Component{

    constructor(){
        super();
        this.switchText.bind(this);
        this.setState({
            activeTextIndex: 0,
            text: {
                1: "Gayathan Stands before the chosen heroes ${this.props.firstCharacter}",
                2: "${this.props.secondCharacter} and ${this.props.thirdCharacter}",
                3: "Tho they are terrified, particularly ${this.props.secondCharacter}...",
                4: "They rise to the task." },
            activeText: this.state.text[0]
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