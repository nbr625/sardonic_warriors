import React from 'react';
import { Link } from 'react-router';
import Game from './game.jsx'
import CharacterProfile from './character-profile.jsx';

export default class SelectionScreen extends React.Component {

    render() {
        return (
            <div>
                <h1>Selection Screen</h1>
                <div>Select your warriors wisely</div>
                <div>You may only take three to battle</div>
                <table>
                    <tr>
                        <td>
                            <ul className="list-of-characters">
                                {Object.keys(this.props.characters).map(this.props.renderCharacterProfile)}
                            </ul>
                        </td>
                        <td>
                            <ul className="list-of-selected-characters">
                                {Object.keys(this.props.selectedCharacters).map(this.props.selectCharacter)}
                            </ul>
                        </td>
                    </tr>
                </table>

                <Link to="battle">To Battle!</Link>
            </div>
        );
    }

}

