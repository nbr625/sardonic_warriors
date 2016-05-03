import React from 'react';
import { Link } from 'react-router';
import Battle from './battle.jsx';

export default class CharacterDiedPanel extends React.Component{


    render() {
        return (
            <div>
                <div id="text">{this.props.lastKilledCharacter} died. How sad...</div>
                <div onClick={this.props.screenHandler('finalTB')}>Next</div>
            </div>
        );
    }
}