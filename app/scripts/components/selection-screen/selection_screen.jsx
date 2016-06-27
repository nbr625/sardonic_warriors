import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

import FirstCharacterPanel from './selection-player-panel.jsx';
import CharacterProfile from './selection-character-profile.jsx';
import ToBattleButton from './to-battle-button.jsx';

export default class SelectionScreen extends React.Component {

    renderBattleButton() {
        var props = this.props,
            firstCharset = props.firstCharacter.hasOwnProperty('player'),
            secondCharset = props.secondCharacter.hasOwnProperty('player'),
            thirdCharset = props.thirdCharacter.hasOwnProperty('player');
        if (firstCharset && (secondCharset && thirdCharset)){
            return <ToBattleButton {...this.props} />;
        }
    }

    render() {

        var props = this.props,
            firstCharset = props.firstCharacter.hasOwnProperty('player'),
            secondCharset = props.secondCharacter.hasOwnProperty('player'),
            thirdCharset = props.thirdCharacter.hasOwnProperty('player'),
            renderPlayerPanel = props.renderPlayerPanel;

        return (
            <div className="selection-screen">
                <h1>Selection Screen</h1>
                <div>Select your warriors wisely</div>
                <div>You may only take three to battle...</div>
                <table>
                    <tbody>
                        {renderPlayerPanel(1)}
                        <tr className="selection-divider"></tr>
                        {renderPlayerPanel(2)}
                        <tr className="selection-divider"></tr>
                        {renderPlayerPanel(3)}
                    </tbody>
                </table>
                <div>
                    {firstCharset &&  secondCharset && thirdCharset ?
                        <ToBattleButton ready={true} {...this.props} />:
                        <ToBattleButton ready={false} {...this.props} />
                    }
                </div>
            </div>
        );
    }

}

