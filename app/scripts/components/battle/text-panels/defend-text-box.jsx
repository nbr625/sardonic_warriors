import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class DefendTextBox extends React.Component{


    render() {
        var text = this.props.activePlayer.name + " sings to himself: \"I am beautiful, in every single way! Words can\'t break me down! Nooooo!\" Everyone seems embarrassed for him, but he is more resilient to verbal abuse by 50 points";
        return (
            <div>
                <div className="battle-text-box-text">{text}</div>
                <div onClick={()=>this.props.screenHandler('PlayerP')}>Next</div>
            </div>
        );
    }
}