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
                    <div id="to-battle">Press Space to Enter Battle</div> :
                    characterCount == 2?
                        <div className="before-picking-three-heroes">
                            <div className="pick-more-heroes">Pick one more Hero</div>
                            <div className="press-space-to-pause-selection">Press Space to Pause</div>
                        </div> :
                        <div>
                            <div className="pick-more-heroes">Pick {3-characterCount} more Heroes</div>
                            <div className="press-space-to-pause-selection">Press Space to Pause</div>
                        </div>
                }
            </div>
        );
    }
}