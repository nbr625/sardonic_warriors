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

                return <CharacterDamageTextBox {...state} screenHandler={this.screenHandler}
                                               setNextTurn={this.setNextTurn.bind(this)} />;
                break;
            case 'PlayerP':
                return <PlayerPanel screenHandler={this.screenHandler.bind(this)} activePlayer={state.activePlayer}
                                    defend={this.defend.bind(this)} encourage={this.encourage.bind(this)}
                                    meditate={this.meditate.bind(this)} setAction={this.setAction.bind(this)}/>;
                break;
            case 'attackP':
                return <AttackPanel screenHandler={this.screenHandler} setAction={this.setAction.bind(this)} {...state}/>;
                break;
            case 'characterD':
                return <CharacterDiedPanel screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'selectHT':
                return <SelectHealTarget screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'defendTB':
                return <DefendTextBox  screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'meditationTB':
                return <MeditationTextBox  screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'selectET':
                return <SelectEncourageTarget screenHandler={this.screenHandler} {...state}/>;
                break;
            case 'encourageTB':
                return <EncourageTextBox  screenHandler={this.screenHandler} encourage={this.encourage} {...state}/>;
                break;
            case 'victoryP':
                return <VictoryPanel screenHandler={this.screenHandler} {...state}/>;
                break;
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
        var state = this.state,
            boss = state.boss,
            targetIndex = Math.floor(Math.random() * state.playableCharacters.length),
            activeActionTarget = this.state.playableCharacters[targetIndex].name;



        if (this.state.boss.hp > 6600){
            boss.attacks = [
                {
                    name: "Make the Snake Dance", magnitude: 250, type: 'damaging', initialText: [
                    "Gayathan joins her vestigial little arms together and begins to move in sinous pulses",
                    "It becomes aparent that she is trying to recreate the snake dance from the youtube video",
                    "Her new body is enormous though, and it is a poor impression.",
                    "the "]
                }, {name: "Talk about parenting Methods", magnitude: 100, type: 'damaging', initialText: [
                    `Gayathan picks ${activeActionTarget} as the unlucky recepient of her parental advice`,
                    "\"The best way to raise your child...\" she begins.",
                    `What follows is a series of the most salacious instructions that #{activeActionTarget} has ever heard`,
                    "The bad advice jades him about parenthood in general."]
                }, {name: "Cackle hellishly", magnitude: 100, type: 'damaging', initialText: [
                    "Usually Gayathan\'s laughter has the power to petrify a small child.",
                    "But since she has now been transformed into the earth\'s top carnivore," +
                    "Her laughter sounds like the wails of all humanity",
                    `She laughs directly at ${activeActionTarget}`,
                    `${activeActionTarget} is so terrified that he looses some of his will to fight.`]
                }, {name: "Take over their window sill", magnitude: 100, type: 'damaging', initialText: [
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


    //similar loop to playableCharactersHandler but with hp as it's argument


    //will set screen to dead.
    playableCharactersHandler: function(){
        var state = this.state,
            characters = state.playableCharacters;
        characters.forEach(function(character){
            if (character.status == 'dead'){
                character = null;
            }
        });
        this.setState({
            playableCharacters: characters
        })
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
        if(activePlayer.courage < activePlayer.maxCourage){
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
                }
                this.setState({
                    firstCharacter: firstCharacter,
                    lastDamage: damage
                });
                break;
            case secondCharacter.name:
                var damage = action.magnitude - secondCharacter.defence;
                secondCharacter.hp = secondCharacter.hp - damage;
                if (secondCharacter.hp <= 0){
                    secondCharacter.hp = 0;
                    secondCharacter.status = 'dead';
                }
                this.setState({
                    secondCharacter: secondCharacter,
                    lastDamage: damage
                });
                break;
            case thirdCharacter.name:
                var damage = action.magnitude - thirdCharacter.defence;
                thirdCharacter.hp = thirdCharacter.hp - damage;
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
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter;

        switch (target.name) {
            case firstCharacter.name:
                var restoration = action.magnitude;
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
            case secondCharacter.name:
                var restoration = action.magnitude;
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
            case thirdCharacter.name:
                var restoration = action.magnitude;
                thirdCharacter.hp = secondCharacter.hp + restoration;
                if(thirdCharacter.hp > thirdCharacter.maxHp){
                    thirdCharacter.hp = thirdCharacter.maxHp;
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

        if (screen == 'selectHT'){
            setTarget = this.setTarget
        } else if ( screen == 'selectET') {
            setTarget = this.encourage
        } else {
            setTarget = function(){}
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td><h1>The Showdown!</h1></td>
                    </tr>
                    <tr>
                        <td>
                            <div onClick={()=>{setTarget(firstCharacter)}}>
                                <div>{firstCharacter.name} </div>
                                <img src={"/images/" + firstCharacter.name.toLowerCase() + "_standing.png"} alt={firstCharacter.name}/>
                                <div>{firstCharacter.hp}/{firstCharacter.maxHp}</div>
                                <div>{firstCharacter.courage}/{firstCharacter.maxCourage}</div>
                            </div>
                            <div onClick={()=>{setTarget(secondCharacter)}}>
                                <div>{secondCharacter.name}</div>
                                <img src={"/images/" + secondCharacter.name.toLowerCase() + "_standing.png"} alt={secondCharacter.name}/>
                                <div>{secondCharacter.hp}/{secondCharacter.maxHp}</div>
                                <div>{secondCharacter.courage}/{secondCharacter.maxCourage}</div>
                            </div>
                            <div onClick={()=>{setTarget(thirdCharacter)}}>
                                <div>{thirdCharacter.name}</div>
                                <img src={"/images/" + thirdCharacter.name.toLowerCase() + "_standing.png"} alt={thirdCharacter.name}/>
                                <div>{thirdCharacter.hp}/{thirdCharacter.maxHp}</div>
                                <div>{thirdCharacter.courage}/{thirdCharacter.maxCourage}</div>
                            </div>
                        </td>
                        <td>
                            <div>{boss.name}</div>
                            <img src={"/images/gayathan_standing.png"}/>
                            <div>{boss.hp}/{boss.maxHp}</div>
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