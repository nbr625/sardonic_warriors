import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';
import SelectionCharacterProfile from './selection-character-profile.jsx'

export default class SelectionPlayerPanel extends React.Component {

    render () {

        var props = this.props,
            player = props.player,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter,
            unselectedCharacters = {};

        for (var key in props.characters){
            if(props.characters[key].player == 0){
                unselectedCharacters[key] = props.characters[key];
            }
        }
        var that = this,
            panelCharacter = {name: 'Select', description: 'character'};
        if (player == 1 && firstCharacter.hasOwnProperty('player')){
            panelCharacter = firstCharacter;
        } else if (player == 2 && secondCharacter.hasOwnProperty('player')) {
            panelCharacter = secondCharacter;
        } else if (player == 3 && thirdCharacter.hasOwnProperty('player')) {
            panelCharacter = thirdCharacter;
        }
        return (
            <tr>

                <td>
                    <ul>
                        {Object.keys(unselectedCharacters).map(function(key){
                            return <SelectionCharacterProfile key={key} index={key} unselectedChars={unselectedCharacters} player={that.props.player} {...that.props}/>;
                        })}
                    </ul>

                </td>

                <td>
                    <img src={"/images/" + panelCharacter.name.toLowerCase() + "_standing.png"} alt={panelCharacter.name}/>
                    <div>{panelCharacter.name}</div>
                </td>

            </tr>
        );
    }

}