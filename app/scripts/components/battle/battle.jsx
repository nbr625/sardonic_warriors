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
import EncourageTextBox from './text-panels/encourage-text-box.jsx';
import DefendTextBox from './text-panels/defend-text-box.jsx';
import MeditationTextBox from './text-panels/meditation-text-box.jsx';
import SelectEncourageTarget from './action-panels/select-encouraging-target-panel.jsx';
import PlayerSpritePanel from './sprites/player-sprite-panel.jsx';
import PlayerSprite from './sprites/player-sprites.jsx';
import BossSprite from './sprites/boss-sprite.jsx';

var ProgressLabel = require('react-progress-label');

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
            selectedCharacter: 0,
            attackingCharacter: 0,
            hurtCharacter: 0,
            dyingCharacter: 0,
            revivingCharacter: 0,
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
                                       setBossSprite={this.setBossSprite.bind(this)}  hurtCharacterHandler={this.hurtCharacterHandler}/>;
                break;
            case 'damageTB':

                return <CharacterDamageTextBox {...state} screenHandler={this.screenHandler} setBossSprite={this.setBossSprite}
                                               setNextTurn={this.setNextTurn.bind(this)} dyingCharacterHandler={this.dyingCharacterHandler}
                                               attackingCharacterHandler={this.attackingCharacterHandler.bind(this)} revivingCharacterHandler={this.revivingCharacterHandler}
                                               hurtCharacterHandler={this.hurtCharacterHandler}/>;
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
                return <CharacterDiedPanel screenHandler={this.screenHandler} dyingCharacterHandler={this.dyingCharacterHandler} setBossSprite={this.setBossSprite} {...state}/>;
                break;
            case 'selectHT':
                return <SelectHealTarget screenHandler={this.screenHandler} {...state} setTarget={this.setTarget}
                                         selectedCharacterHandler={this.selectedCharacterHandler} attackingCharacterHandler={this.attackingCharacterHandler}/>;
                break;
            case 'defendTB':
                return <DefendTextBox  screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'meditationTB':
                return <MeditationTextBox  screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'selectET':
                return <SelectEncourageTarget screenHandler={this.screenHandler} {...state} setTarget={this.setTarget}
                                              selectedCharacterHandler={this.selectedCharacterHandler} attackingCharacterHandler={this.attackingCharacterHandler}/>;
                break;
            case 'encourageTB':
                return <EncourageTextBox  screenHandler={this.screenHandler} encourage={this.encourage} {...state}/>;
                break;
            case 'victoryP':
                return <VictoryPanel screenHandler={this.screenHandler} {...state}/>;
                break;
        }
    },

    selectedCharacterHandler: function(character){
        this.setState({
            selectedCharacter: character
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
            this.screenHandler('selectHT');
            this.selectedCharacterHandler(1);
        }
    },

    setTarget: function(target, encourage=false){

        var state = this.state,
            activeAction = state.activeAction;

        if (encourage){
            this.screenHandler('encourageTB');
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
                    name: "Make the Snake Dance", magnitude: 1000, type: 'damaging', initialText: [
                    "Gayathan joins her vestigial little arms together and begins to move in sinous pulses",
                    "It becomes aparent that she is trying to recreate the snake dance from the youtube video",
                    "Her new body is enormous though, and it is a poor impression.",
                    "the "]
                }, {name: "Talk about parenting Methods", magnitude: 1000, type: 'damaging', initialText: [
                    `Gayathan picks ${activeActionTarget} as the unlucky recepient of her parental advice`,
                    "\"The best way to raise your child...\" she begins.",
                    `What follows is a series of the most salacious instructions that ${activeActionTarget} has ever heard`,
                    "The bad advice jades him about parenthood in general."]
                }, {name: "Cackle hellishly", magnitude: 1000, type: 'damaging', initialText: [
                    "Usually Gayathan\'s laughter has the power to petrify a small child.",
                    "But since she has now been transformed into the earth\'s top carnivore," +
                    "Her laughter sounds like the wails of all humanity",
                    `She laughs directly at ${activeActionTarget}`,
                    `${activeActionTarget} is so terrified that he looses some of his will to fight.`]
                }, {name: "Take over their window sill", magnitude: 1000, type: 'damaging', initialText: [
                    "Gayathan wants to find a comfy place to rest her tired clawed feet",
                    `She find her favorite window sill by ${activeActionTarget}\'s desk`,
                    `${activeActionTarget} worries that now, instead of enjoying the quite drama of Redwood City,`,
                    "he will have to find pleasure in Gayathan\'s nightmare enducing Dinosaur transformation",
                    "The thought brings bile to the back of his throat"]
                }
            ];
        } else if (this.state.boss.hp > 3300) {
            boss.attacks = [
                {name: "Insist that you watch bollywood videos", magnitude: 250, type: 'damaging', initialText: [
                    "Now that she is one the deadliest predators that have ever roamed the earth,",
                    "Gayathan has the confidence to force everyone to watch her favorite Bollywood flicks with her",
                    `She demands that ${activeActionTarget} bring her some popcorn or else she shall make him his snack`,
                    `${activeActionTarget} spends his whole day popping inumerable packets of popcorn.`]
                }, {name: "Howl at the moon", magnitude: 100, type: 'damaging', initialText: [
                        "As the first member of the Moon Freaks Gayathan has special moon powers",
                        "Her new form only amplifies this power.",
                        "She produces a terrible howl that summons the moon into the day sky",
                        `The moon shoots a ray of vengeful energy directly at ${activeActionTarget}`]
                }, {name: "Check herself out", magnitude: 100, type: 'damaging', initialText: [
                        "Gayathan takes a moment to catch her reflection in the mirror",
                        "She begins to check herself out, posing in different ways, each more ridiculous than the last",
                        `${activeActionTarget} is particularly disturbed by ther disproportionate self-regard`,
                        "The sight makes him loose some of his morale"]
                }
            ];

        } else {
            boss.attacks = [
                {name: "Smell Attack", magnitude: 250, type: 'damaging', initialText: [
                    "Gayathan raises her little arms up in the air",
                    `a pungent cloud of body odor wafts directly at ${activeActionTarget}`,
                    "Before he can think to do otherwise, he breaths in the lethal aroma"]
                }, {name: "Word Attack", magnitude: 100, type: 'damaging', initialText: [
                    `Gayathan begins to talk to ${activeActionTarget} an accelerated pace`,
                    "She doesn't seem to be saying anything coherent",
                    `${activeActionTarget} begins to loose his mind to the nonesense storm`]
                }, {name: "Insist on her masala manana", magnitude: 100, type: 'damaging', initialText: [
                    `Gayathan wants ${activeActionTarget} to try her masala manana,`,
                    `${activeActionTarget} doesn\'t want to be rude, even if Gayathan is now a terrifying monster`,
                    "He decides to take the smallest spec of food that would be considered polite",
                    "Upon hitting his tongue, the morsel burns his tongue to a crisp",
                    "It is spicy beyond any shadow of sanity"]
                }, {name: "Harness the power of the sun", magnitude: 100, type: 'damaging', initialText: [
                        "Gayathan stands by the window, charging herself with Solar energy",
                        "She behins to glow with an unnatural yellow light",
                        `She looks directly at ${activeActionTarget} and shoots a with hot plasma laser at him`]
                }
            ]
        }

        var attackIndex = Math.floor(Math.random() * this.props.size(boss.attacks)),
                attack = state.boss.attacks[attackIndex];

        this.setAction(attack, this.state.playableCharacters[targetIndex]);
    },


    setVictory: function(){
        this.screenHandler('victoryP');
    },


    setNextTurn: function(){
        var state = this.state,
            boss = state.boss,
            firstChar = state.firstCharacter,
            secondChar = state.secondCharacter,
            thirdChar = state.thirdCharacter,
            character = state.activePlayer.name;

        if(boss.status == 'dead'){
            this.setVictory();
        } else if(firstChar.status == 'dead' && secondChar.status == 'dead' && thirdChar.status == 'dead') {
            this.setGameOver();
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
                    }else{
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
                    }
                    else if(secondChar.status == 'alive') {
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
                    this.hurtCharacterHandler(0);
                    this.dyingCharacterHandler(firstCharacter.player);
                    this.setState({lastKilledCharacter: firstCharacter})
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastDamage: damage
                });
                break;
            case secondCharacter.name:
                var damage = action.magnitude - secondCharacter.defense;
                secondCharacter.hp = secondCharacter.hp - damage;
                if (secondCharacter.hp <= 0){
                    secondCharacter.hp = 0;
                    secondCharacter.status = 'dead';
                    this.hurtCharacterHandler(0);
                    this.dyingCharacterHandler(secondCharacter.player);
                    this.setState({lastKilledCharacter: secondCharacter})
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastDamage: damage
                });
                break;
            case thirdCharacter.name:
                var damage = action.magnitude - thirdCharacter.defense;
                thirdCharacter.hp = thirdCharacter.hp - damage;
                if (thirdCharacter.hp <= 0){
                    thirdCharacter.hp = 0;
                    thirdCharacter.status = 'dead';
                    this.hurtCharacterHandler(0);
                    this.dyingCharacterHandler(thirdCharacter.player);
                    this.setState({lastKilledCharacter: thirdCharacter})
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastDamage: damage
                });
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
                break;
            case secondCharacter.name:
                var restoration = action.magnitude;
                if(secondCharacter.status === 'dead'){
                    secondCharacter.status = 'alive';
                    this.revivingCharacterHandler(secondCharacter);
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
            case thirdCharacter.name:
                var restoration = action.magnitude;
                thirdCharacter.hp = secondCharacter.hp + restoration;
                if(thirdCharacter.hp > thirdCharacter.maxHp){
                    thirdCharacter.hp = thirdCharacter.maxHp;
                    this.revivingCharacterHandler(thirdCharacter);
                }
                this.setState({
                    thirdCharacter: thirdCharacter,
                    lastHeal: restoration
                });
        }
        this.takeCourage();
    },

    render: function() {
        var props = this.props,
            state = this.state,
            screen = state.screen,
            firstCharacter = props.firstCharacter,
            secondCharacter = props.secondCharacter,
            thirdCharacter = props.thirdCharacter,
            boss = props.boss,
            setTarget;

        return (
            <div className="battle">
                <div>
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
                                progressColor="#b92c28">
                                <span className="player-hp-bar-text boss-hp-bar-text">{boss.hp}/{boss.maxHp}</span>
                                <span className="hp-label boss-hp-label">HP</span>
                            </ProgressLabel>
                            <img className="boss-profile-picture" src={"/images/" + boss.name.toLowerCase() + "-profile.png"} alt={boss.name}/>
                        </div>
                    </div>

                    <div className="sprite-panel">

                        <PlayerSpritePanel {...state} />

                        <div><img className="table" src={"/images/battle_background.png"}/></div>

                        <div className="boss-sprite">
                            <BossSprite {...state}/>
                        </div>
                    </div>
                    <div>
                        <div className="text-panel">
                            {this.renderPanel()}
                        </div>
                    </div>
                    <audio src="/music/battle.mp3" loop></audio>
                </div>
            </div>

        );
    }
});

export default Battle;