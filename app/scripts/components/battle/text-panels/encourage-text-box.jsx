import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class EncourageTextBox extends React.Component{


    render() {
        var text = this.props.activePlayer + " remind " + this.props.activeActionTarget + "that he will die someday. But today is not that day. " +  this.props.activeActionTarget + " is encouraged by this cryptic statement.";
        return (
            <div>
                <div id="text">{text}</div>
                <div onClick={this.props.screenHandler('PlayerP')}>Next</div>
            </div>
        );
    }
}