import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';



export default class ToBattleButton extends React.Component {


    render () {
        var props = this.props,
            character = props.characters,
            characterCount = 0;
        Object.keys(props.characters).map(function(key){
            if(character[key].player){
                characterCount++;
            }
        });

        return (
            <div>
                {props.ready ?
                    <Link onClick={()=> {this.props.resetBoss}} to="battle">To Battle!</Link> :
                    characterCount == 2?
                        <div>Pick one more Hero</div> :
                        <div>Pick {3-characterCount} more Heroes</div>
                }
            </div>
        );
    }
}