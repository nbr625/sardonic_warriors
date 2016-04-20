import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';



export default class ToBattleButton extends React.Component {

    render () {
        return (
            <div>
                <Link to="battle">To Battle!</Link>
            </div>
        );
    }
}