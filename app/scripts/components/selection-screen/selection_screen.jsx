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
            playerHighlighted: 1,
            characterIndexHighlighted: 0
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
        if(e.keyCode == 32) {
            this.props.selectCharacter(this.state.characterIndexHighlighted, this.state.playerHighlighted);
        }
    }

    pressUp(e){
        var state = this.state,
            playerHighlighted = state.playerHighlighted,
            characterIndexHighlighted = state.characterIndexHighlighted,
            selectableCharSize = this.props.size(this.props.unselectedCharacters);

        if(e.keyCode == 38){
            e.preventDefault();


            if (playerHighlighted == 1 && characterIndexHighlighted == 0) {
                setState({
                    playerHighlighted: 3,
                    characterIndexHighlighted: selectableCharSize
                });
            } else if(playerHighlighted > 1 && characterIndexHighlighted > 0) {
                setState({
                    playerHighlighted: playerHighlighted - 1,
                    characterIndexHighlighted: selectableCharSize
                });

            } else {
                setState({
                    characterIndexHighlighted: characterIndexHighlighted - 1
                });

            }

        }
    }

    pressDown(e){
        var state = this.state,
            playerHighlighted = state.playerHighlighted,
            characterIndexHighlighted = state.characterIndexHighlighted,
            selectableCharSize = this.props.size(this.props.unselectedCharacters);

        if(e.key == 40){
            e.preventDefault();

            if (playerHighlighted == 3 && characterIndexHighlighted == selectableCharSize) {
                setState({
                    playerHighlighted: 1,
                    characterIndexHighlighted: 0
                });
            } else if(playerHighlighted < 3 && characterIndexHighlighted == selectableCharSize) {
                setState({
                    playerHighlighted: playerHighlighted + 1,
                    characterIndexHighlighted: 0
                });

            } else {
                setState({
                    characterIndexHighlighted: characterIndexHighlighted + 1
                });

            }
        }
    }

    pressSpace(e){
        var props = this.props,
            firstCharset = props.firstCharacter.hasOwnProperty('player'),
            secondCharset = props.secondCharacter.hasOwnProperty('player'),
            thirdCharset = props.thirdCharacter.hasOwnProperty('player'),
            all_selected =firstCharset &&  secondCharset && thirdCharset;

        if(e.key == 'Enter' && all_selected) {
            this.context.history.pushState(null, 'battle');
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
                <audio src="/music/selection-screen.mp3" autoPlay loop></audio>
            </div>
        );
    }

}

reactMixin(SelectionScreen, History);
export default SelectionScreen;
