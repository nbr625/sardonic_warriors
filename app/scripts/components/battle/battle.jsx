import React from 'react';
import { Link } from 'react-router';

import { History } from 'react-router';
import reactMixin from 'react-mixin';

import Game from '../game.jsx';

import Introduction from './text-panels/introduction.jsx';
import InitialTextBox from './text-panels/initial-text-box.jsx';
import CharacterDamageTextBox from './text-panels/character-damage-text-box.jsx';
import PlayerPanel from './action-panels/player-panel.jsx';
import AttackPanel from './action-panels/attack-panel.jsx';
import SelectHealTarget from './action-panels/select-healing-target-panel.jsx';
import CharacterDiedPanel from './text-panels/character-died.jsx';
import EncourageTextBox from './text-panels/encourage-text-box.jsx';
import DefendTextBox from './text-panels/defend-text-box.jsx';
import MeditationTextBox from './text-panels/meditation-text-box.jsx';
import SelectEncourageTarget from './action-panels/select-encouraging-target-panel.jsx';
import PlayerSpritePanel from './sprites/player-sprite-panel.jsx';
import PlayerSprite from './sprites/player-sprites.jsx';
import BossSprite from './sprites/boss-sprite.jsx';
import NotEnoughCourage from './text-panels/not-enough-courage.jsx';
import VictoryPanel from './text-panels/victory-text.jsx';
import GameOverPanel from './text-panels/game-over-text.jsx';

var ProgressLabel = require('react-progress-label');

var Battle = React.createClass({

    getInitialState: function(){
        var firstChar = this.props.firstCharacter,
            secChar = this.props.secondCharacter,
            thirdChar = this.props.thirdCharacter;

        this.setActivePlayer.bind(this);
        this.setAction.bind(this);
        this.screenHandler.bind(this);
        return {

            defaultListenerPreventerHandler: this.defaultListenerPreventer.bind(this),
            paused: false,
            pressSpaceHandler: this.pressSpace.bind(this),
            pressESCHandler: this.pressESC.bind(this),

            firstCharacter: firstChar,
            secondCharacter: secChar,
            thirdCharacter: thirdChar,
            playableCharacters: [firstChar, secChar, thirdChar],
            activePlayer: this.props.firstCharacter,
            lastKilledCharacter: 0,
            activeAction: {},
            activeActionTarget: {},
            boss: this.props.boss,
            bossState: 1,
            screen: 'intro',
            lastDamage: '',
            lastHeal: '',
            lastEncouraging: '',
            selectedCharacter: 0,
            attackingCharacter: 0,
            hurtCharacter: 0,
            dyingCharacter: 0,
            revivingCharacter: 0,
            toBattleCharacter: 0,
            returningCharacter: 0,
            bossSpriteState: 'standing'
        }
    },

    screenHandler: function(screen){
        this.setState({ screen: screen });
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
                                       screenHandler={this.screenHandler} {...this.props} {...state}
                                       heal={this.heal.bind(this)} damage={this.damage.bind(this)}
                                       attackingCharacterHandler={this.attackingCharacterHandler.bind(this)}
                                       setBossSprite={this.setBossSprite.bind(this)}  hurtCharacterHandler={this.hurtCharacterHandler}
                                       toBattleCharacterHandler={this.toBattleCharacterHandler}/>;
                break;
            case 'damageTB':

                return <CharacterDamageTextBox {...state} screenHandler={this.screenHandler} setBossSprite={this.setBossSprite}
                                               setNextTurn={this.setNextTurn.bind(this)} dyingCharacterHandler={this.dyingCharacterHandler}
                                               attackingCharacterHandler={this.attackingCharacterHandler.bind(this)} revivingCharacterHandler={this.revivingCharacterHandler}
                                               hurtCharacterHandler={this.hurtCharacterHandler} returningCharacterHandler={this.returningCharacterHandler}/>;
                break;
            case 'PlayerP':
                return <PlayerPanel screenHandler={this.screenHandler.bind(this)} activePlayer={state.activePlayer}
                                    defend={this.defend.bind(this)} encourage={this.encourage.bind(this)}
                                    meditate={this.meditate.bind(this)} setAction={this.setAction.bind(this)}
                                    selectedCharacterHandler={this.selectedCharacterHandler.bind(this)}/>;
                break;
            case 'attackP':
                return <AttackPanel screenHandler={this.screenHandler} setAction={this.setAction.bind(this)} {...state}/>;
                break;
            case 'characterD':
                return <CharacterDiedPanel screenHandler={this.screenHandler} dyingCharacterHandler={this.dyingCharacterHandler}
                                           setBossSprite={this.setBossSprite} setNextTurn={this.setNextTurn.bind(this)} {...state}/>;
                break;
            case 'selectHT':
                return <SelectHealTarget screenHandler={this.screenHandler} {...state} setTarget={this.setTarget}
                                         selectedCharacterHandler={this.selectedCharacterHandler} attackingCharacterHandler={this.attackingCharacterHandler}/>;
                break;
            case 'defendTB':
                return <DefendTextBox  screenHandler={this.screenHandler} setNextTurn={this.setNextTurn.bind(this)} {...state}/>;
                break;
            case 'meditationTB':
                return <MeditationTextBox  screenHandler={this.screenHandler} setNextTurn={this.setNextTurn.bind(this)} {...state}/>;
                break;
            case 'selectET':
                return <SelectEncourageTarget screenHandler={this.screenHandler} {...state} setTarget={this.setTarget}
                                              selectedCharacterHandler={this.selectedCharacterHandler} attackingCharacterHandler={this.attackingCharacterHandler}/>;
                break;
            case 'encourageTB':
                return <EncourageTextBox  screenHandler={this.screenHandler} setNextTurn={this.setNextTurn.bind(this)} encourage={this.encourage} {...state}/>;
                break;
            case 'notEC':
                return <NotEnoughCourage screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'victoryP':
                return <VictoryPanel screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'gameOP':
                return <GameOverPanel screenHandler={this.screenHandler} {...state}/>;
        }
    },

    defaultListenerPreventer: function(e){
        if(e.keyCode == 8){
            e.preventDefault();
        }
    },

    componentDidMount(){
        window.addEventListener('keydown', this.state.defaultListenerPreventerHandler);
        window.addEventListener('keydown', this.state.pressSpaceHandler);
        window.addEventListener('keydown', this.state.pressESCHandler);
    },

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.defaultListenerPreventerHandler);
        window.removeEventListener('keydown', this.state.pressSpaceHandler);
        window.removeEventListener('keydown', this.state.pressESCHandler);
    },

    pressSpace(e){
        var audio = new Audio('/music/page-flipping-sound-1.mp3');



        if(e.keyCode == 32) {
            e.preventDefault();
            audio.play();

            if (this.state.paused == false) {
                this.setState({
                    paused: true
                });
            } else {
                this.setState({
                    paused: false
                });
            }
        }
    },

    pressESC(e){
        var state = this.state,
            audio = new Audio('/music/start-menu.mp3');

        if(e.keyCode == 27 && state.paused == true) {
            e.preventDefault();
            audio.play();
            this.context.history.pushState(null, '/');
        }
    },

    selectedCharacterHandler: function(character){
        this.setState({
            selectedCharacter: character
        });
    },

    toBattleCharacterHandler: function(character){
        this.setState({
            toBattleCharacter: character
        });
    },

    returningCharacterHandler: function(character){
        debugger;
        this.setState({
            returningCharacter: character
        });
    },

    attackingCharacterHandler: function(character){
        this.setState({
            attackingCharacter: character
        });

    },

    hurtCharacterHandler: function(character){
        this.setState({
            hurtCharacter: character
        });
    },

    dyingCharacterHandler: function(character){
        this.setState({
            dyingCharacter: character
        });
    },

    revivingCharacterHandler: function(character){
        this.setState({
            revivingCharacter: character
        });
    },

    setBossSprite: function(status){
        this.setState({
            bossSpriteState: status
        });
    },

    setActivePlayer: function(player){
        this.setState({
            activePlayer: player
        });
    },

    updatePlayableCharacters: function() {
        var state = this.state,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter,
            playableCharacters = [],
            allCharacters = [firstCharacter, secondCharacter, thirdCharacter];

        for(var index in allCharacters){
            if(allCharacters[index].status == 'alive'){
                playableCharacters.push(allCharacters[index]);
            }
        }
        this.setState({
            playableCharacters: playableCharacters
        });
    },

    setAction: function(action, target=null) {
        this.setState({
            activeAction: action
        });
        if (target == this.state.boss) {
            this.setState({
                activeActionTarget: target
            });
            this.setBossSprite('to-battle');
            this.toBattleCharacterHandler(this.state.activePlayer.player);
            this.screenHandler('initialTB');
        } else if(target){
            this.setState({
                activeActionTarget: target
            });
            this.setBossSprite('to-battle');
            this.toBattleCharacterHandler(this.state.activeActionTarget.player);
            this.screenHandler('initialTB');
        } else {
            this.selectedCharacterHandler;
            this.screenHandler('selectHT');
        }
    },

    setTarget: function(target, encourage=false){

        var state = this.state,
            activeAction = state.activeAction;

        if (encourage){
            this.screenHandler('encourageTB');
            this.encourage(target)
        } else {
            if (activeAction.type = 'healing') {
                this.heal(activeAction, target);
            }
            this.screenHandler('damageTB');
        }
        this.setState({
            activeActionTarget: target,
            selectedCharacter: 0
        });
    },

    bossTakesTurn: function(){
        var state = this.state,
            boss = state.boss,
            targetIndex = Math.floor(Math.random() * state.playableCharacters.length),
            activeActionTarget = this.state.playableCharacters[targetIndex].name;

        if (this.state.boss.hp > 6600){
            boss.attacks = [
                {
                    name: "Make the Snake Dance", magnitude: 2000, type: 'damaging', initialText: [
                    ["Gayathan joined her vestigial little arms together and moved in",
                    "sinous pulses, to everyone\'s confusion It became apparent"],
                    ["was trying to recreate the snake dance from the youtube video",
                    "Her new body was enormous though, and it was a poor impression."]]
                }, {name: "Talk about parenting Methods", magnitude: 2000, type: 'damaging', initialText: [
                    [`Gayathan picked ${activeActionTarget} as the unlucky recepient of`,
                    "her parental advice \"The best way to raise your child...\" she begun."],
                    [`She took no time dispensing the most salacious advise that ${activeActionTarget}`,
                    "has ever heard. The bad advice jadeed him about parenthood in general."]]
                }, {name: "Cackle hellishly", magnitude: 2000, type: 'damaging', initialText: [
                    ["Usually Gayathan\'s laughter had the power to petrify a small child.",
                    "But since she was transformed into the earth\'s top carnivore,"],
                    ["Her laughter sounded like the wails of all humanity being tortured",
                    `She laughed directly at ${activeActionTarget}, who was mortified`]]
                }, {name: "Take over their window sill", magnitude: 2000, type: 'damaging', initialText: [
                    ["Gayathan wanted to find a comfy place to rest her tired clawed feet",
                    `She sat by window sill next to ${activeActionTarget}\'s desk`],
                    [`${activeActionTarget}; instead of enjoying the quite drama of`,
                    "Redwood City he was blocked by nightmare enducing Dinosaur"]]
                }
            ];
        } else if (this.state.boss.hp > 3300) {
            boss.attacks = [
                {name: "Insist that you watch bollywood videos", magnitude: 200, type: 'damaging', initialText: [
                    ["Now that she was one the deadliest predators to ever roam the earth,",
                    "Gayathan has the confidence to force someone watch a Bollywood movie"],
                    [`${activeActionTarget} was unfortunately chosen as her victim`,
                    `He spent many hours watching people dance insanely`]]
                }, {name: "Howl at the moon", magnitude: 350, type: 'damaging', initialText: [
                        ["As the first member of the Moon Freaks Gayathan had special powers",
                        "Her new form only amplifed those mystical power."],
                        ["She produced a terrible howl that summons the moon into the day sky",
                        `The moon shot a ray of vengeful energy directly at ${activeActionTarget}`]]
                }, {name: "Check herself out", magnitude: 250, type: 'damaging', initialText: [
                        ["Gayathan took a moment to catch her reflection in the mirror",
                        "Shamelessly,She checked herself out; she seems proud of her eldritch looks"],
                        [`${activeActionTarget} is particularly disturbed by her disproportionate`,
                         "self-regard. The sight made him loose some of his own self-regard"]]
                }
            ];

        } else {
            boss.attacks = [
                {name: "Smell Attack", magnitude: 350, type: 'damaging', initialText: [
                    ["Gayathan raised her little arms up in the air",
                    `a pungent cloud of body odor wafted directly at ${activeActionTarget}`],
                    ["Before he could think to do otherwise, he breathed in the lethal aroma",
                     "It made him question the sanctity of life."]]
                }, {name: "Word Attack", magnitude: 300, type: 'damaging', initialText: [
                    [`Gayathan talked to ${activeActionTarget} an accelerated pace.`,
                    "She didn't say anything that could be classified as a thought"],
                    [`${activeActionTarget} stated to loose mind to the spate of nonsense`,
                     "He was boggled at the thought that someone really thinks this thoughts"]]
                }, {name: "Insist on her masala manana", magnitude: 400, type: 'damaging', initialText: [
                    [`Gayathan wanted ${activeActionTarget} to try her masala manana,`,
                    `he didn\'t want to be rude, even if she was a terrifying monster`],
                    ["He decided to take the smallest thimble of food. However, The dish was",
                    "spicy beyond any shadow of sanity spicy, it burned his tongue to a crisp"]]
                }, {name: "Harness the power of the sun", magnitude: 500, type: 'damaging', initialText: [
                    ["Gayathan stood by the window, charging herself with Solar energy",
                    "She glowed with a forbidding yellow hue..."],
                    [`She looks directly at ${activeActionTarget} and roars, discharging`,
                     "solar flames at him. He would be sunburned for days..."]]
                }
            ]
        }

        var attackIndex = Math.floor(Math.random() * this.props.size(boss.attacks)),
                attack = state.boss.attacks[attackIndex];

        this.setAction(attack, this.state.playableCharacters[targetIndex]);
    },

    setNextTurn: function(){
        var state = this.state,
            boss = state.boss,
            firstChar = state.firstCharacter,
            secondChar = state.secondCharacter,
            thirdChar = state.thirdCharacter,
            character = state.activePlayer.name;

        if(boss.status == 'dead'){
            this.screenHandler('victoryP');
        } else if(firstChar.status == 'dead' && secondChar.status == 'dead' && thirdChar.status == 'dead') {
            this.screenHandler('gameOP');
        } else {
            switch(character) {
                case firstChar.name:
                    if(firstChar.name && secondChar.status == 'alive') {
                        this.setActivePlayer(secondChar);
                        this.screenHandler('PlayerP');
                    }else if (firstChar.name && thirdChar.status == 'alive') {
                        this.setActivePlayer(thirdChar);
                        this.screenHandler('PlayerP');
                    } else {
                        this.setActivePlayer(boss);
                        this.bossTakesTurn();
                    }
                    break;
                case secondChar.name:
                    if(thirdChar.status == 'alive') {
                        this.setActivePlayer(thirdChar);
                        this.screenHandler('PlayerP');
                    } else {
                        this.setActivePlayer(boss);
                        this.bossTakesTurn();
                    }
                    break;
                case thirdChar.name:
                    this.setActivePlayer(boss);
                    this.bossTakesTurn();
                    break;
                case boss.name:
                    if (firstChar.status == 'alive') {
                        this.setActivePlayer(firstChar);
                        this.screenHandler('PlayerP');
                    } else if(secondChar.status == 'alive') {
                        this.setActivePlayer(secondChar);
                        this.screenHandler('PlayerP');
                    } else {
                        this.setActivePlayer(thirdChar);
                        this.screenHandler('PlayerP');
                    }
            }
        }
    },

    takeCourage: function(){
        var state = this.state;
        state.activePlayer.courage -=  state.activeAction.courageCost;
        switch(state.activePlayer.name){
            case state.firstCharacter.name:
                this.setState({
                    firstCharacter: state.activePlayer
                });
                break;
            case state.secondCharacter.name:
                this.setState({
                    secondCharacter: state.activePlayer
                });
                break;
            case state.thirdCharacter.name:
                this.setState({
                    thirdCharacter: state.activePlayer
                });
        }
    },

    defend: function(){
        var state = this.state;

        state.activePlayer.defense += 50;
        switch(state.activePlayer.name){
            case state.firstCharacter.name:
                this.setState({
                    firstCharacter: state.activePlayer
                });
                break;
            case state.secondCharacter.name:
                this.setState({
                    secondCharacter: state.activePlayer
                });
                break;
            case state.thirdCharacter.name:
                this.setState({
                    thirdCharacter: state.activePlayer
                });

        }

    },

    meditate: function(){
        var state = this.state,
            activePlayer = state.activePlayer,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;
        activePlayer.courage += 50;
        if(activePlayer.courage > activePlayer.maxCourage){
            activePlayer.courage = activePlayer.maxCourage;
        }
        switch(activePlayer.name){
            case firstCharacter.name:
                this.setState({
                    firstCharacter:  activePlayer
                });
                break;
            case secondCharacter.name:
                this.setState({
                    secondCharacter:  activePlayer
                });
                break;
            case thirdCharacter.name:
                this.setState({
                    thirdCharacter:  activePlayer
                });
        }

    },

    encourage: function(target){
        var state = this.state,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;

        target.courage += 50;
        if(target.courage > target.maxCourage){
            target.courage = target.maxCourage;
        }

        switch(target.name){
            case firstCharacter.name:
                this.setState({
                    firstCharacter: target,
                    activeActionTarget: target
                });
                break;
            case secondCharacter.name:
                if(secondCharacter.courage > secondCharacter.maxCourage){
                    secondCharacter.courage = secondCharacter.maxCourage;
                }
                this.setState({
                    secondCharacter:  target,
                    activeActionTarget: target
                });
                break;
            case thirdCharacter.name:
                if(thirdCharacter.courage > thirdCharacter.maxCourage){
                    thirdCharacter.courage = thirdCharacter.maxCourage;
                }
                this.setState({
                    thirdCharacter:  target,
                    activeActionTarget: target
                });
        }
        this.screenHandler('encourageTB');
    },

    damage: function(action, target){
        var state = this.state,
            boss = state.boss,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;
        switch (target.name) {
            case boss.name:
                var damage = action.magnitude - boss.defense;
                boss.hp = boss.hp - damage;
                if (boss.hp <= 0){
                    boss.hp = 0;
                    boss.status = 'dead';
                }
                this.setState({
                    boss: boss,
                    lastDamage: damage
                });
                this.takeCourage();
                break;
            case firstCharacter.name:
                var damage = action.magnitude - firstCharacter.defense;
                firstCharacter.hp = firstCharacter.hp - damage;
                if (firstCharacter.hp <= 0){
                    firstCharacter.hp = 0;
                    firstCharacter.status = 'dead';
                    this.setState({lastKilledCharacter: firstCharacter})
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastDamage: damage
                });
                this.updatePlayableCharacters();
                break;
            case secondCharacter.name:
                var damage = action.magnitude - secondCharacter.defense;
                secondCharacter.hp = secondCharacter.hp - damage;
                if (secondCharacter.hp <= 0){
                    secondCharacter.hp = 0;
                    secondCharacter.status = 'dead';
                    this.setState({lastKilledCharacter: secondCharacter})
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastDamage: damage
                });
                this.updatePlayableCharacters();
                break;
            case thirdCharacter.name:
                var damage = action.magnitude - thirdCharacter.defense;
                thirdCharacter.hp = thirdCharacter.hp - damage;
                if (thirdCharacter.hp <= 0){
                    thirdCharacter.hp = 0;
                    thirdCharacter.status = 'dead';
                    this.setState({lastKilledCharacter: thirdCharacter})
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastDamage: damage
                });
                this.updatePlayableCharacters();
        }
    },

    heal: function(action, target){
        var state = this.state,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;

        switch (target.name) {
            case firstCharacter.name:
                var restoration = action.magnitude;
                if(firstCharacter.status === 'dead'){
                    firstCharacter.status = 'alive';
                    this.revivingCharacterHandler(firstCharacter);
                }
                firstCharacter.hp = firstCharacter.hp + restoration;
                if(firstCharacter.hp > firstCharacter.maxHp){
                    firstCharacter.hp = firstCharacter.maxHp;
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastHeal: restoration
                });
                this.updatePlayableCharacters();
                break;
            case secondCharacter.name:
                var restoration = action.magnitude;
                if(secondCharacter.status === 'dead'){
                    secondCharacter.status = 'alive';
                    this.revivingCharacterHandler(secondCharacter);
                }
                secondCharacter.hp = secondCharacter.hp + restoration;
                if(secondCharacter.hp > secondCharacter.maxHp){
                    secondCharacter.hp = secondCharacter.maxHp;
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastHeal: restoration
                });
                this.updatePlayableCharacters();
                break;
            case thirdCharacter.name:
                var restoration = action.magnitude;
                if(thirdCharacter.status === 'dead'){
                    thirdCharacter.status = 'alive';
                    this.revivingCharacterHandler(secondCharacter);
                }
                thirdCharacter.hp = thirdCharacter.hp + restoration;
                if(thirdCharacter.hp > thirdCharacter.maxHp){
                    thirdCharacter.hp = thirdCharacter.maxHp;
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastHeal: restoration
                });
                this.updatePlayableCharacters();
        }
        this.takeCourage();
    },

    renderFrame: function(){
        switch(this.state.screen){
            case 'PlayerP':
            case 'attackP':
            case 'selectHT':
            case 'selectET':
                return <img className="golden-frame-pic" src="images/golden-frame.png"/>;
                break;
            default:
        }

    },

    render: function() {
        var props = this.props,
            state = this.state,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter,
            boss = props.boss,
            panelClass = '';

        switch(state.screen){
            case 'PlayerP':
            case 'attackP':
            case 'selectHT':
            case 'selectET':
                panelClass = "button-panel";
                break;
            default:
                panelClass = "text-panel";
        }

        return (
            <div className="battle">
                <img className="battle-parchment-image" src="/images/old-partchment-background.png"/>
                <div className="battle-content">
                    <div>
                        <div>
                            <ProgressLabel
                                className="player-hp-bar"
                                id="first-character-player-hp-bar"
                                progress={firstCharacter.hp/firstCharacter.maxHp * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={180}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#4cae4c">
                                <span className="player-hp-bar-text" id="first-character-player-hp-bar-text">{firstCharacter.hp}/{firstCharacter.maxHp}</span>
                                <span className="hp-label first-character-hp-label">HP</span>
                            </ProgressLabel>

                            <ProgressLabel
                                className="player-courage-bar"
                                id="first-character-courage-bar"
                                progress={firstCharacter.courage/firstCharacter.maxCourage * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={140}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#2aabd2">
                                <span className="player-courage-bar-text" id="first-character-player-courage-bar-text">{firstCharacter.courage}/{firstCharacter.maxCourage}</span>
                                <span className="courage-label first-character-courage-label">Courage</span>
                            </ProgressLabel>
                            <img className="first-character-profile-picture" src={"/images/" + firstCharacter.name.toLowerCase() + "-profile.png"} alt={firstCharacter.name}/>
                        </div>
                        <div>
                            <ProgressLabel
                                className="player-hp-bar"
                                id="second-character-player-hp-bar"
                                progress={secondCharacter.hp/secondCharacter.maxHp * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={180}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#4cae4c">
                                <span className="player-hp-bar-text" id="second-character-player-hp-bar-text">{secondCharacter.hp}/{secondCharacter.maxHp}</span>
                                <span className="hp-label second-character-hp-label">HP</span>
                            </ProgressLabel>

                            <ProgressLabel
                                className="player-courage-bar"
                                id="second-character-courage-bar"
                                progress={secondCharacter.courage/secondCharacter.maxCourage * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={140}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#2aabd2">
                                <span className="player-courage-bar-text" id="second-character-player-courage-bar-text">{secondCharacter.courage}/{secondCharacter.maxCourage}</span>
                                <span className="courage-label second-character-courage-label">Courage</span>
                            </ProgressLabel>
                            <img className="second-character-profile-picture" src={"/images/" + secondCharacter.name.toLowerCase() + "-profile.png"} alt={secondCharacter.name}/>
                        </div>
                        <div>
                            <ProgressLabel
                                className="player-hp-bar"
                                id="third-character-player-hp-bar"
                                progress={thirdCharacter.hp/thirdCharacter.maxHp * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={180}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#4cae4c">
                                <span className="player-hp-bar-text" id="third-character-player-hp-bar-text">{thirdCharacter.hp}/{thirdCharacter.maxHp}</span>
                                <span className="hp-label third-character-hp-label">HP</span>
                            </ProgressLabel>

                            <ProgressLabel
                                className="player-courage-bar"
                                id="third-character-courage-bar"
                                progress={thirdCharacter.courage/thirdCharacter.maxCourage * 100}
                                startDegree={0}
                                progressWidth={18}
                                trackWidth={20}
                                cornersWidth={0}
                                size={140}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#2aabd2">
                                <span className="player-courage-bar-text" id="third-character-player-courage-bar-text">{thirdCharacter.courage}/{thirdCharacter.maxCourage}</span>
                                <span className="courage-label third-character-courage-label">Courage</span>
                            </ProgressLabel>
                            <img className="third-character-profile-picture" src={"/images/" + thirdCharacter.name.toLowerCase() + "-profile.png"} alt={thirdCharacter.name}/>
                        </div>
                        <div>
                            <ProgressLabel
                                className="player-hp-bar boss-hp-bar"
                                id="boss-hp-bar"
                                progress={boss.hp/boss.maxHp * 100}
                                startDegree={0}
                                progressWidth={26}
                                trackWidth={30}
                                cornersWidth={0}
                                size={180}
                                fillColor="black"
                                trackColor="black"
                                progressColor="#4cae4c">
                                <span className="player-hp-bar-text boss-hp-bar-text">{boss.hp}/{boss.maxHp}</span>
                                <span className="hp-label boss-hp-label">HP</span>
                            </ProgressLabel>
                            <img className="boss-profile-picture" src={"/images/" + boss.name.toLowerCase() + "-profile.png"} alt={boss.name}/>
                        </div>
                    </div>

                    <div className="sprite-panel">

                        <PlayerSpritePanel {...state} />

                        <div><img className="table" src={"/images/battle_background_final.png"}/></div>

                        <div className="boss-sprite">
                            <BossSprite {...state}/>
                        </div>
                    </div>
                    <div>
                        <div className={panelClass}>
                            {this.renderPanel()}
                            {this.renderFrame()}
                        </div>
                        <div className="press-space-to-pause-battle">Press Space to Pause</div>
                    </div>
                    {state.paused ?
                        <div id="battle paused-element-battle">
                            <img className="battle-parchment-image battle-paused-image" src="/images/old-partchment-background.png"/>
                            <img className="battle-controls" src="/images/battle-panel-controls.png"/>
                        </div> :
                            <div className="empty"></div>
                    }
                    <audio src="/music/battle.mp3" autoPlay loop></audio>
                </div>
            </div>

        );
    }
});

reactMixin(Battle, History);
export default Battle;