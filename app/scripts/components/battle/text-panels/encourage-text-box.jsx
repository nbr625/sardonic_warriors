import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class EncourageTextBox extends React.Component{

    render() {
        var text = this.props.activePlayer.name + " remind " + this.props.activeActionTarget.name + " that he will die someday. But today is not that day. " +  this.props.activeActionTarget.name + " is encouraged by this cryptic statement.";
        return (
            <div>
                <div className="battle-text-box-text">{text}</div>
                <div onClick={()=> {this.props.screenHandler('PlayerP')}}>Next</div>
            </div>
        );
    }
}