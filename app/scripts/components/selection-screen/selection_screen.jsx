import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

import FirstCharacterPanel from './selection-player-panel.jsx';
import CharacterProfile from './selection-character-profile.jsx';
import ToBattleButton from './to-battle-button.jsx';

import { History } from 'react-router';
import reactMixin from 'react-mixin';

class SelectionScreen extends React.Component {

    constructor(props,context){
        super(props, context);
        this.state = {
            pressUpHandler: this.pressUp.bind(this),
            pressDownHandler: this.pressDown.bind(this),
            pressEnterHandler: this.pressEnter.bind(this),
            pressSpaceHandler: this.pressSpace.bind(this),
        };
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.pressUpHandler);
        window.addEventListener('keydown', this.state.pressDownHandler);
        window.addEventListener('keydown', this.state.pressEnterHandler);
        window.addEventListener('keydown', this.state.pressSpaceHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
        window.removeEventListener('keydown', this.state.pressDownHandler);
        window.removeEventListener('keydown', this.state.pressEnterHandler);
        window.removeEventListener('keydown', this.state.pressSpaceHandler);
    }

    pressEnter(e){
        var props = this.props;
        if(e.key == 'Enter') {
            props.selectCharacter(props.characterIndexHighlighted, props.playerHighlighted);
        }
    }

    pressUp(e){
        debugger;
        var props = this.props,
            playerHighlighted = props.playerHighlighted,
            characterIndexHighlighted = props.characterIndexHighlighted,
            selectableCharSize = props.unselectedCharacters.length - 1,
            setPlayerHighlighted = props.setPlayerHighlighted,
            setCharacterIndexHighlighted = props.setCharacterIndexHighlighted;

        if(e.keyCode == 38) {
            e.preventDefault();
            if (playerHighlighted == 1 && characterIndexHighlighted == 0) {
                setPlayerHighlighted(3);
                setCharacterIndexHighlighted(selectableCharSize);
            } else if(playerHighlighted > 1 && characterIndexHighlighted == 0) {
                setPlayerHighlighted(playerHighlighted - 1);
                setCharacterIndexHighlighted(selectableCharSize);
            } else {
                setCharacterIndexHighlighted(characterIndexHighlighted - 1);
            }
        }
    }

    pressDown(e){
        var props = this.props,
            playerHighlighted = props.playerHighlighted,
            characterIndexHighlighted = props.characterIndexHighlighted,
            selectableCharSize = props.unselectedCharacters.length - 1,
            setPlayerHighlighted = props.setPlayerHighlighted,
            setCharacterIndexHighlighted = props.setCharacterIndexHighlighted;

        if(e.keyCode == 40) {
            e.preventDefault();
            if (playerHighlighted == 3 && characterIndexHighlighted == selectableCharSize) {
                setPlayerHighlighted(1);
                setCharacterIndexHighlighted(0);
            } else if(playerHighlighted < 3 && characterIndexHighlighted == selectableCharSize) {
                setPlayerHighlighted(playerHighlighted + 1);
                setCharacterIndexHighlighted(0);
            } else {
                setCharacterIndexHighlighted(characterIndexHighlighted + 1);
            }
        }
    }

    pressSpace(e){
        var props = this.props,
            firstCharset = props.firstCharacter.hasOwnProperty('player'),
            secondCharset = props.secondCharacter.hasOwnProperty('player'),
            thirdCharset = props.thirdCharacter.hasOwnProperty('player'),
            all_selected =firstCharset &&  secondCharset && thirdCharset;

        if(e.keyCode == 32 && all_selected) {
            this.context.history.pushState(null, 'battle');
            this.props.resetBoss();
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
                <h1 className="selection-title">Selection Screen</h1>
                <div className="select-wisely">Select your warriors wisely</div>
                <div className="only-three">You may only take three to battle...</div>
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
                <audio src="/music/selection-screen.mp3" loop></audio>
            </div>
        );
    }

}

reactMixin(SelectionScreen, History);
export default SelectionScreen;
