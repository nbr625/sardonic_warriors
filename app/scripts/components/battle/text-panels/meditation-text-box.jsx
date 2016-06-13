import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class MeditationTextBox extends React.Component{


    render() {
        var text = this.props.activePlayer.name + " thinks about the fact that he is statistical miracle that could end at any moment that the universal die stops rolling in his favor. The thought somehow encourages him. Weirdo.";
        return (
            <div>
                <div id="text">{text}</div>
                <div onClick={()=>this.props.screenHandler('PlayerP')}>Next</div>
            </div>
        );
    }
}