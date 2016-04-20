import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx'
import SelectedCharacterPanel from './selected-character-panel.jsx'
import CharacterProfile from '../character-profile.jsx';
import ToBattleButton from './to-battle-button.jsx'

export default class SelectionScreen extends React.Component {

    renderBattleButton() {
        if (this.props.size(this.props.selectedCharacters) >= 3) {
            return <ToBattleButton {...this.props} />;
        }
    }

    render() {
        return (
            <div>
                <h1>Selection Screen</h1>
                <div>Select your warriors wisely</div>
                <div>You may only take three to battle</div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <ul className="list-of-characters">
                                    {Object.keys(this.props.characters).map(this.props.renderCharacterProfile)}
                                </ul>
                            </td>
                            <td>
                                <SelectedCharacterPanel {...this.props}  />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {this.renderBattleButton()}
            </div>
        );
    }

}

