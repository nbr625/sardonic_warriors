import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';
import SelectionCharacterProfile from './selection-character-profile.jsx'

export default class SelectionPlayerPanel extends React.Component {

    render () {

        var that = this,
            panelCharacter = {name: 'Select', description: 'character'},
            props = this.props,
            player = props.player,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter,
            spriteStatus = 'walking';

        if (player == 1 && firstCharacter.hasOwnProperty('player')){
            panelCharacter = firstCharacter;
        } else if (player == 2 && secondCharacter.hasOwnProperty('player')) {
            panelCharacter = secondCharacter;
        } else if (player == 3 && thirdCharacter.hasOwnProperty('player')) {
            panelCharacter = thirdCharacter;
        } else {
            panelCharacter = {name: 'Select'};
            spriteStatus = 'standing';
        }

        var playerClass = panelCharacter.name != 'Select' ? panelCharacter.class : "",
            playerSummary = panelCharacter.name != 'Select' ? panelCharacter.profileText : "",
            walkingSpriteUrl = "/images/" + panelCharacter.name.toLowerCase() + "_walking.png",
            walkingSpriteStyles ={
            backgroundImage: 'url(' + walkingSpriteUrl + ')'
        };

        return (
            <tr className="player-selection-panel">

                <td className="single-selection-panel">
                    <ul className="list-group">
                        {Object.keys(props.unselectedCharacters).map(function(key){
                            return <SelectionCharacterProfile key={key} index={key} player={that.props.player} {...that.props}/>;
                        })}
                    </ul>

                </td>

                <td className="selection-sprite">
                    {spriteStatus == 'walking'?
                        <div className="sprite-walking" style={walkingSpriteStyles}></div> :
                        <img src={"/images/" + panelCharacter.name.toLowerCase() + "_standing.png"} alt={panelCharacter.name}/>
                    }
                </td>

                <td className="character-selection-text">
                    <div className="player-class">{panelCharacter.name}:   {playerClass}</div>
                    <div className="player-summary">{playerSummary}</div>
                </td>

            </tr>
        );
    }

}