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
            paused: false,
            pressUpHandler: this.pressUp.bind(this),
            pressDownHandler: this.pressDown.bind(this),
            pressEnterHandler: this.pressEnter.bind(this),
            pressSpaceHandler: this.pressSpace.bind(this),
            pressESCHandler: this.pressESC.bind(this)
        };
    }

    componentDidMount(){
        this.props.resetPlayers();
        window.addEventListener('keydown', this.state.pressUpHandler);
        window.addEventListener('keydown', this.state.pressDownHandler);
        window.addEventListener('keydown', this.state.pressEnterHandler);
        window.addEventListener('keydown', this.state.pressSpaceHandler);
        window.addEventListener('keydown', this.state.pressESCHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
        window.removeEventListener('keydown', this.state.pressDownHandler);
        window.removeEventListener('keydown', this.state.pressEnterHandler);
        window.removeEventListener('keydown', this.state.pressSpaceHandler);
        window.removeEventListener('keydown', this.state.pressESCHandler);
    }

    pressEnter(e){
        var props = this.props,
            audio = new Audio('/music/select-character.mp3');
        if(e.key == 'Enter') {
            audio.play();
            props.selectCharacter(props.characterIndexHighlighted, props.playerHighlighted);
        }
    }

    pressUp(e){
        var props = this.props,
            playerHighlighted = props.playerHighlighted,
            characterIndexHighlighted = props.characterIndexHighlighted,
            selectableCharSize = props.unselectedCharacters.length - 1,
            setPlayerHighlighted = props.setPlayerHighlighted,
            setCharacterIndexHighlighted = props.setCharacterIndexHighlighted,
            audio = new Audio('/music/menu-selection-key.mp3');

        if(e.keyCode == 38) {
            e.preventDefault();
            audio.play();
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
            setCharacterIndexHighlighted = props.setCharacterIndexHighlighted,
            audio = new Audio('/music/menu-selection-key.mp3');

        if(e.keyCode == 40) {
            e.preventDefault();
            audio.play();
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
            all_selected =firstCharset &&  secondCharset && thirdCharset,
            audio = new Audio('/music/start-menu.mp3'),
            audio2 = new Audio('/music/page-flipping-sound-1.mp3');



        if(e.keyCode == 32) {
            e.preventDefault();
            if (all_selected) {
                audio.play();
                this.context.history.pushState(null, 'battle');
                props.resetBoss();

            } else if (this.state.paused == false) {
                audio2.play();
                this.setState({
                    paused: true
                });
            } else {
                audio2.play();
                this.setState({
                    paused: false
                });
            }
        }
    }

    pressESC(e){
        var state = this.state,
            props = this.props,
            audio = new Audio('/music/start-menu.mp3');

        if(e.keyCode == 27 && state.paused == true) {
            e.preventDefault();
            audio.play();
            this.context.history.pushState(null, '/');
            props.resetBoss();
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
                <h1 className="selection-title">So one has answered the calling! Listen well...</h1>
                <div className="select-wisely">I can only grant you control over three Breakthroughers</div>
                <div className="only-three">Please, choose wisely...</div>
                <img className="player-selection-parchment-image" src="/images/old-partchment-background.png"/>
                <table className="player-selection-parchment">
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

                {this.state.paused ?
                    <div id="selection-screen paused-element-selection">
                        <img className="player-selection-parchment-image" src="/images/old-partchment-background.png"/>
                        <img className="selection-controls" src="/images/selection-panel-controls.png"/>
                    </div> :
                    <div className="empty"></div>
                }
                <audio src="/music/selection-instructions.mp3" autoPlay></audio>
                <audio src="/music/selection-screen.mp3" autoPlay loop></audio>
            </div>

        );
    }

}

reactMixin(SelectionScreen, History);
export default SelectionScreen;
