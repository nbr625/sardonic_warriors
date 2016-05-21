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
            boss: this.props.boss,
            bossState: 1,
            activeBossAttackSets: 'to be written',
            screen: 'intro',

            lastDamage: '',
            lastHeal: ''
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
        switch (screen) {
            case 'intro':
                return <Introduction screenHandler={this.screenHandler.bind(this)} {...this.props} />;
                break;
            case 'initialTB':

                return <InitialTextBox activeAction={state.activeAction} activeActionTarget={state.activeActionTarget}
                                       screenHandler={this.screenHandler} {...this.props}
                                       heal={this.heal.bind(this)} damage={this.damage.bind(this)}/>;
                break;
            case 'damageTB':

                return <CharacterDamageTextBox {...state} screenHandler={this.screenHandler.bind(this)}
                                               setNextTurn={this.setNextTurn.bind(this)} />;
                break;
            case 'PlayerP':
                return <PlayerPanel screenHandler={this.screenHandler.bind(this)} activePlayer={state.activePlayer}
                                    defend={this.defend} setAction={this.setAction.bind(this)}
                                    meditate={this.meditate} encourage={this.encourage}/>;
                break;
            case 'attackP':
                return <AttackPanel setAction={this.setAction} activePlayer={state.activePlayer}
                                    screenHandler={this.screenHandler}/>;
                break;
            case 'victoryP':
                return <VictoryPanel />;
                break;
            case 'characterD':
                return <CharacterDiedPanel />;
                break;
            case 'selectHT':
                return <SelectHealTarget />;
        }
    },

    setActivePlayer(player){
        this.setState({
            activePlayer: player
        });
    },


    setAction: function(action, target=null){
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
        var state = this.state,
            boss = state.boss,
            firstChar = state.firstCharacter,
            secondChar = state.secondCharacter,
            thirdChar = state.thirdCharacter;

        if(boss.status == 'dead'){
            this.setVictory();
        } else if(firstChar.status == 'dead' && secondChar.status == 'dead' && thirdChar.status == 'dead') {
            this.setGameOver();
        } else {
            switch(character) {
                case(firstChar && secondChar.status == 'alive'):
                    this.setActivePlayer(secondChar);
                    this.screenHandler('PlayerP');
                    break;
                case(firstChar && thirdChar.status == 'alive'):
                    this.setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
                    break;
                case(firstChar):
                    this.setActivePlayer(boss);
                    this.bossTakesTurn();
                    break;
                case(secondChar && thirdChar.status == 'alive'):
                    this.setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
                    break;
                case(secondChar || thirdChar):
                    this.setActivePlayer(boss);
                    this.bossTakesTurn();
                    break;
                case(boss && firstChar == 'alive'):
                    this.setActivePlayer(firstChar);
                    this.screenHandler('PlayerP');
                    break;
                case(boss && secondChar == 'alive'):
                    this.setActivePlayer(secondChar);
                    this.screenHandler('PlayerP');
                    break;
                default:
                    this.setActivePlayer(thirdChar);
                    this.screenHandler('PlayerP');
            }
        }
    },

    defend: function(){
        var state = this.state;
        state.playableCharacters.map(function(char){
            char.defence += 50;
        });
        this.setState({
            firstCharacter: playableCharacter[0],
            secondCharacter: playableCharacter[1],
            thirdCharacter: playableCharacter[2]
        });
    },

    meditate: function(){
        var state = this.state,
            activePlayer = state.activePlayer,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;
        if(activePlayer.name === firstCharacter.name){
            firstCharacter.courage += 50;
            if(firstCharacter.courage > firstCharacter.maxCourage){
                firstCharacter.courage = firstCharacter.maxCourage;
            }
            setState({
               firstCharacter:  firstChatacter
            });
        } else if(activePlayer.name === secondCharacter.name){
            secondCharacter.courage += 50;
            if(secondCharacter.courage > secondCharacter.maxCourage){
                secondCharacter.courage = secondCharacter.maxCourage;
            }
            setState({
                firstCharacter:  secondCharacter
            });
        } else if(activePlayer.name === thirdCharacter.name){
            thirdCharacter.courage += 50;
            if(thirdCharacter.courage > thirdCharacter.maxCourage){
                thirdCharacter.courage = thirdCharacter.maxCourage;
            }
            setState({
                firstCharacter:  thirdCharacter
            });
        }
    },

    encourage: function(target){
        switch(target){
            case 'p1':
                firstCharacter.courage += 50;
                if(firstCharacter.courage > firstCharacter.maxCourage){
                    firstCharacter.courage = firstCharacter.maxCourage;
                }
                setState({
                    firstCharacter:  firstChatacter
                });
            case 'p2':
                secondCharacter.courage += 50;
                if(secondCharacter.courage > secondCharacter.maxCourage){
                    secondCharacter.courage = secondCharacter.maxCourage;
                }
                setState({
                    firstCharacter:  secondCharacter
                });
            case 'p3':
                thirdCharacter.courage += 50;
                if(thirdCharacter.courage > thirdCharacter.maxCourage){
                    thirdCharacter.courage = thirdCharacter.maxCourage;
                }
                setState({
                    firstCharacter:  thirdCharacter
                });

        }
    },

    damage: function(action, target){
        var state = this.state,
            boss = state.boss,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;
        switch (target) {
            case 'boss':
                var damage = action.magnitude - boss.defence;
                boss.hp = boss.hp - damage;
                if (boss.hp <= 0){
                    boss.hp = 0;
                    boss.status = 'dead';
                }
                this.setState({
                    boss: boss,
                    lastDamage: damage
                });
                break;
            case 'p1':
                var damage = action.magnitude - firstCharacter.defence;
                firstCharacter.hp = firstCharacter.hp - firstCharacter.defense;
                if (firstCharacter.hp <= 0){
                    firstCharacter.hp = 0;
                    firstCharacter.status = 'dead';
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastDamage: damage
                });
                break;
            case 'p2':
                var damage = action.magnitude - secondCharacter.defence;
                if (secondCharacter.hp <= 0){
                    secondCharacter.hp = 0;
                    secondCharacter.status = 'dead';
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastDamage: damage
                });
                break;
            case 'p3':
                var damage = action.magnitude - thirdCharacter.defence;
                if (thirdCharacter.hp <= 0){
                    thirdCharacter.hp = 0;
                    thirdCharacter.status = 'dead';
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastDamage: damage
                });
        }
    },

    heal: function(action, target){
        var state = this.state,
            restoration = action.magnitude,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;

        switch (target) {
            case 'p1':
                if(firstCharacter.status === 'dead'){
                    firstCharacter.status = 'alive';
                }
                firstCharacter.hp = firstCharacter.hp + restoration;
                if(firstCharacter.hp > firstCharacter.maxHp){
                    firstCharacter.hp = firstCharacter.maxHp;
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastHeal: restoration
                });
                break;
            case 'p2':
                if(secondCharacter.status === 'dead'){
                    secondCharacter.status = 'alive';
                }
                secondCharacter.hp = secondCharacter.hp + restoration;
                if(thirdCharacter.hp > secondCharacter.maxHp){
                    thirdCharacter.hp = secondCharacter.maxHp;
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastHeal: restoration
                });
                break;
            case 'p3':
                thirdCharacter.hp = secondCharacter.hp + restoration;
                if(thirdCharacter.hp > thirdCharacter.maxHp){
                    thirdCharacter.hp = thirdCharacter.maxHp;
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastHeal: restoration
                });
        }
    },

    render: function() {
        var state = this.state,
            props = this.props,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter,
            boss = props.boss;

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
                                <div>{firstCharacter.name} {firstCharacter.hp}/{firstCharacter.maxHp}</div>
                            </div>
                            <div onClick={()=>{this.setHealingTarget()}}>
                                <img src={"/images/" + secondCharacter.name.toLowerCase() + "_standing.png"} alt={secondCharacter.name}/>
                                <div>{secondCharacter.name} {secondCharacter.hp}/{secondCharacter.maxHp}</div>
                            </div>
                            <div onClick={()=>{this.setHealingTarget()}}>
                                <img src={"/images/" + thirdCharacter.name.toLowerCase() + "_standing.png"} alt={thirdCharacter.name}/>
                                <div>{thirdCharacter.name} {thirdCharacter.hp}/{thirdCharacter.maxHp}</div>
                            </div>
                        </td>
                        <td>
                            <img src={"/images/gayathan_standing.png"}/>
                            <div>{boss.name} {boss.hp}/{boss.maxHp}</div>
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