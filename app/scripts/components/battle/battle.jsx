import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

import Introduction from './introduction.jsx';
import InitialTextBox from './initial-text-box.jsx';
import CharacterDamageTextBox from './character-damage-text-box.jsx';
import FinalTextBox from './final-text_box.jsx';
import PlayerPanel from './player-panel.jsx';
import AttackPanel from './attack-panel.jsx';
import SelectHealTarget from './select_healing_target_panel.jsx';
import CharacterDiedPanel from './character-died.jsx';

class default class Battle extends React.Component{

    //activePlayers and individual characters are now different entities for the sake of
    //establishing flexibility
    //lastKilled character is another new entity that might be changed to all killed characters
    //for the sake of symmetry and ability to revive.
    constructor(props, context){
        super(props, context);
        var firstChar = this.props.firstCharacter,
            secChar = this.props.secondCharacter,
            thirdChar = this.props.thirdCharacter;

        this.setActivePlayer.bind(this);
        this.setAction.bind(this);
        this.screenHandler.bind(this);

        this.setState({
            firstCharacter: this.props.firstCharacter,
            secondCharacter: this.props.secondCharacter,
            thirdCharacter: this.props.thirdCharacter,
            playableCharacters: {firstChar, secChar, thirdChar},
            activePlayer: this.props.firstCharacter,
            lastKilledCharacter: {},
            activeAction: {},
            activeActionTarget: {},

            boss: this.props.gayathan,
            bossHP: this.props.gayathan.hp,
            bossState: 1,
            bossStateAttackSets: this.props.gayathan.attacks,
            activeBossAttackSets: 'to be written',

            screen: 'intro'
        });
    }

    screenHandler(screen, dead=null){
        this.setState({
            screen: screen
        });
        if (dead){
            this.setState({lastKilledCharacter: dead});
        }

    }

    setActivePlayer(player){
        this.setState({
            activePlayer: player
        });
    }


    setAction(action, target=null){
        this.setState({
           activeAction: action
        });
        if(target){
            this.setState({
                activeActionTarget: target
            });
            this.screenHandler('initialTB');
        } else {
            this.screenHandler('selectHT')
        }


    }

    setHealingTarget(target){
        this.setState({
            activeActionTarget: target
        });
    }

    actionHandler(action, target){
        switch(action) {
            case 'damaging':
                target.hp = target.hp - action.magnitude;
                if(target.hp < 0) {
                    target.hp = 0;
                    target.status = 'dead';
                }
                break;
            case 'healing':
                if(target.hp == 0) {
                    target.status = 'alive';
                }
                target.hp = target.hp + action.magnitude;
                if(target.hp > target.maxHP){
                    target.hp = target.maxHP;
                }
        }
        this.setState({
            activeActionTarget: target
        });
        this.updateCharacter(target);
        this.playableCharactersHandler();
    }

    updateCharacter(character){
        var state = this.state;
        switch(character.name){
            case state.firstCharacter.name:
                this.setState({
                    firstCharacter: character
                });
                break;
            case state.secondCharacter.name:
                this.setState({
                    secondCharacter: character
                });
                break;
            case state.thirdCharacter.name:
                this.setState({
                    thirdCharacter: character
                });
                break;
            default:
                this.setState({
                    boss: character
                });
        }

    }

    bossTakesTurn(){
        var size = this.props.size(),
            targetIndex = Math.floor((Math.random() * this.state.playableCharacters.length) + 1),
            attackIndex = Math.floor((Math.random() * size(this.state.bossStateAttackSets)) + 1),
            attack = this.state.activeBossAttackSets[attackIndex];
        this.setAction(attack, this.state.playableCharacters[targetIndex]);
    }


    //similar loop to playableCharactersHandler but with hp as it's argument


    //will set screen to dead.
    playableCharactersHandler(){
        var characters = this.state.playableCharacters;
        Object.keys(characters).map(function(key){
            if (characters[key].status == 'dead'){
                switch(characters[key].name){
                    case this.state.firstCharacter.name:
                        this.setState({
                           firstCharacter:  characters[key]
                        });
                        break;
                    case this.state.secondCharacter.name:
                        this.setState({
                            secondCharacter:  characters[key]
                        });
                        break;
                    case this.state.thirdCharacter.name:
                        this.setState({
                            thirdCharacter:  characters[key]
                        });
                        break;
                }
                characters[key] = null;

            }
        });
        this.setState({
            playableCharacters: characters
        })
    }


    setVictory(){
        this.screenHandler('victoryP');
    }


    setGameOver(){

    }

    setNextTurn(character){
        var boss = this.state.gayathan,
            firstChar = this.state.firstCharacter,
            secondChar = this.state.secondCharacter,
            thirdChar = this.state.thirdCharacter,
            setActivePlayer = this.setActivePlayer();

        if(boss.status == 'dead'){
            this.setVictory();
        } else if(firstChar.status == 'dead' && secondChar.status == 'dead' && thirdChar.status == 'dead') {
            this.setGameOver();
        } else {
            switch(character) {
                case(firstChar && secondChar.status == 'alive'):
                    setActivePlayer(secondChar);
                    this.screenHandler('PlayerP');
                    break;
                case(firstChar && thirdChar.status == 'alive'):
                    setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
                    break;
                case(firstChar):
                    setActivePlayer(boss);
                    this.bossTakesTurn();
                    break;
                case(secondChar && thirdChar.status == 'alive'):
                    setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
                    break;
                case(secondChar || thirdChar):
                    setActivePlayer(boss);
                    this.bossTakesTurn();
                    break;
                case(boss && firstChar == 'alive'):
                    setActivePlayer(firstChar);
                    this.screenHandler('PlayerP');
                    break;
                case(boss && secondChar == 'alive'):
                    setActivePlayer(secondChar);
                    this.screenHandler('PlayerP');
                    break;
                default:
                    setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
            }
        }
    }

    render() {
        var state = this.state,
            healing = !(state.screen == 'selectHT'),
            panel;

        switch(screen) {
            case 'intro':
                panel = <Introduction intro={state.intro} screenHandler={this.screenHandler}/>;
                break;
            case 'initialTB':
                panel = <InitialTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                        screenHandler={this.screenHandler}/>;
                break;
            case 'damageTB':
                panel = <DamageTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                       activePlayer={state.activePlayer} screenHandler={this.screenHandler}/>;
                break;
            case 'finalTB':
                panel = <FinalTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                      setNextTurn={this.setNextTurn}/>;
                break;
            case 'PlayerP':
                panel = <PlayerPanel screenHandler={this.screenHandler} activePlayer={state.activePlayer}/>;
                break;
            case 'attackP':
                panel = <AttackPanel setAction={this.setAction} activePlayer={state.activePlayer}
                                     screenHandler={this.screenHandler}/>;
                break;
            case 'victoryP':
                panel = <VictoryPanel />;
                break;
            case 'characterD':
                panel = <CharacterDiedPanel />;
                break;
            case 'selectHT':
                panel = <SelectHealTarget />;

        }

        return (
            <table>
                <tbody>
                <tr>
                    <td><h1>The Showdown!</h1></td>
                </tr>
                <tr>
                    <td>

                        <div onClick={this.setHealingTarget(state.firstCharacter)} disabled={healing}>{state.firstCharacter.name}</div>
                        <div onClick={this.setHealingTarget(state.secondCharacter)} disabled={healing}>{state.secondCharacter.name}</div>
                        <div onClick={this.setHealingTarget(state.secondCharacter)} disabled={healing}>{state.thirdCharacter.name}</div>
                    </td>

                    <td>
                        <div>{state.boss}</div>

                    </td>
                 </tr>
                <tr>
                    <td className="panel">
                        {panel}
                    </td>
                </tr>
                </tbody>
            </table>

        );
    }
}
