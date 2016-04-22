import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectionScreen from './selection_screen.jsx';
import CharacterSprite from '../character-sprite.jsx'

export default class ThirdPlayerPanel extends React.Component {

    render () {
        var props = this.props,
            unselectedCharaters = props.characters.filter(function (el) {
                return el.player = null;
            }),
            renderProfile = props.renderCharacterProfile;
        return (
            <span>

                <td>
                    {Object.keys(unselectedCharaters).map(renderProfile(unselectedCharaters[key], 3, false))}
                </td>

                <td>
                    {props.thirdCharacter.name}
                </td>

            </span>
        );
    }

}
