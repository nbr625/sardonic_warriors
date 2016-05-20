import React from 'react';
import { Link } from 'react-router';
import Game from '../game.jsx';

import Introduction from './text-panels/introduction.jsx';
import InitialTextBox from './text-panels/initial-text-box.jsx';
import CharacterDamageTextBox from './text-panels/character-damage-text-box.jsx';
import PlayerPanel from './action-panels/player-panel.jsx';
import AttackPanel from './action-panels/attack-panel.jsx';
import SelectHealTarget from './action-panels/select-healing-target-panel.jsx';
import CharacterDiedPanel from './text-panels/character-died.jsx';


var Battle = React.createClass({

    //activePlayers and individual characters are now different entities for the sake of
    //establishing flexibility
    //lastKilled character is another new entity that might be changed to all killed characters
    //for the sake of symmetry and ability to revive.
    getInitialState: function(){
        var firstChar = this.props.firstCharacter,
            secChar = this.props.secondCharacter,
            thirdChar = this.props.thirdCharacter;

        this.setActivePlayer.bind(this);
        this.setAction.bind(this);
        this.screenHandler.bind(this);

        return {
            firstCharacter: firstChar,
            secondCharacter: secChar,
            thirdCharacter: thirdChar,
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
        }
    },

    screenHandler: function(screen, dead=null){
        this.setState({ screen: screen });
        if (dead){
            this.setState({lastKilledCharacter: dead});
        }

    },

    renderPanel: function() {

        var state = this.state,
            screen = state.screen;
        if (screen === 'intro') {
            return <Introduction screenHandler={this.screenHandler.bind(this)} {...this.props} />;
        } else if (screen === 'initialTB') {
            return <InitialTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                   screenHandler={this.screenHandler.bind(this)} {...this.props}/>;
        } else if (screen === 'damageTB') {
            debugger;
            return <DamageTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                  activePlayer={state.activePlayer} screenHandler={this.screenHandler}/>;
        } else if (screen === 'PlayerP') {
            return <PlayerPanel screenHandler={this.screenHandler.bind(this)} activePlayer={state.activePlayer}
                                defend={this.defend} setAction={this.setAction.bind(this)}
                                meditate={this.meditate} encourage={this.encourage}/>;
        } else if (screen === 'attackP'){
            return <AttackPanel setAction={this.setAction} activePlayer={state.activePlayer}
                                screenHandler={this.screenHandler}/>;
        } else if (screen === 'victoryP') {
            return <VictoryPanel />;
        } else if (screen === 'characterD') {
            return <CharacterDiedPanel />;
        } else if (screen === 'selectHT') {
            return <SelectHealTarget />;
        }
    },

    setActivePlayer(player){
        this.setState({
            activePlayer: player
        });
    },


    setAction: function(action, target=null){
        debugger;
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


    },

    setHealingTarget: function(target){
        this.setState({
            activeActionTarget: target
        });
    },

    actionHandler: function(action, target){
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
    },

    updateCharacter: function(character){
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

    },

    bossTakesTurn: function(){
        var size = this.props.size(),
            targetIndex = Math.floor((Math.random() * this.state.playableCharacters.length) + 1),
            attackIndex = Math.floor((Math.random() * size(this.state.bossStateAttackSets)) + 1),
            attack = this.state.activeBossAttackSets[attackIndex];
        this.setAction(attack, this.state.playableCharacters[targetIndex]);
    },


    //similar loop to playableCharactersHandler but with hp as it's argument


    //will set screen to dead.
    playableCharactersHandler: function(){
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
    },


    setVictory: function(){
        this.screenHandler('victoryP');
    },


    setNextTurn: function(character){
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
    },

    defend: function(){

    },

    meditate: function(){

    },

    encourage: function(){

    },

    render: function() {
        var state = this.state,
            props = this.props,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter;


        return (
            <table>
                <tbody>
                    <tr>
                        <td><h1>The Showdown!</h1></td>
                    </tr>
                    <tr>
                        <td>
                            <div onClick={()=>{this.setHealingTarget()}}>
                                <img src={"/images/" + firstCharacter.name.toLowerCase() + "_standing.png"} alt={firstCharacter.name}/>
                                <div>{firstCharacter.name}</div>
                            </div>
                            <div onClick={()=>{this.setHealingTarget()}}>
                                <img src={"/images/" + secondCharacter.name.toLowerCase() + "_standing.png"} alt={secondCharacter.name}/>
                                <div>{secondCharacter.name}</div>
                            </div>
                            <div onClick={()=>{this.setHealingTarget()}}>
                                <img src={"/images/" + thirdCharacter.name.toLowerCase() + "_standing.png"} alt={thirdCharacter.name}/>
                                <div>{thirdCharacter.name}</div>
                            </div>
                        </td>
                        <td>
                            <img src={"/images/gayathan_standing.png"}/>
                            <div>{state.boss.name}</div>
                        </td>
                    </tr>
                    <tr>
                        <td className="panel">
                            {this.renderPanel()}
                        </td>
                    </tr>
                </tbody>
            </table>

        );
    }
});

export default Battle;