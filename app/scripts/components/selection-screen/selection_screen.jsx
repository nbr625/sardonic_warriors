import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';
import SelectedCharacterPanel from './selected-character-panel.jsx';
import FirstCharacterPanel from './first-player-panel.jsx';
import SecondCharacterPanel from './selected-character-panel.jsx';
import ThirdCharacterPanel from './third-player-panel.jsx';
import CharacterProfile from '../character-profile.jsx';
import ToBattleButton from './to-battle-button.jsx';

export default class SelectionScreen extends React.Component {

    renderBattleButton() {
        if (this.props.size(this.props.selectedCharacters) >= 3) {
            return <ToBattleButton {...this.props} />;
        }
    }

    render() {

        var renderCharacterProfile = this.props.renderCharacterProfile();

        return (
            <div>
                <h1>Selection Screen</h1>
                <div>Select your warriors wisely</div>
                <div>You may only take three to battle</div>
                <table>
                    <tbody>
                        <tr>
                            <FirstPlayerPanel {...this.props} />
                        </tr>
                        <tr>
                            <SecondPlayerPanel {...this.props} />
                        </tr>
                        <tr>
                            <ThirdPlayerPanel {...this.props} />
                        </tr>
                    </tbody>
                </table>
                {this.renderBattleButton()}
            </div>
        );
    }

}

