import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createHistory from '../../../node_modules/history/lib/createHashHistory'

import StartScreen from './start-screen/start_screen.jsx';

import Layout from './layout.jsx'

import Intro from './intro/intro.jsx';
import IPanel1 from './intro/panels/intro-panel-1.jsx';
import IPanel2 from './intro/panels/intro-panel-2.jsx';
import IPanel3 from './intro/panels/intro-panel-3.jsx';
import IPanel4 from './intro/panels/intro-panel-4.jsx';
import IPanel5 from './intro/panels/intro-panel-5.jsx';
import IPanel6 from './intro/panels/intro-panel-6.jsx';
import IPanel7 from './intro/panels/intro-panel-7.jsx';
import IPanel8 from './intro/panels/intro-panel-8.jsx';
import IPanel9 from './intro/panels/intro-panel-9.jsx';
import IPanel10 from './intro/panels/intro-panel-10.jsx';
import IPanel11 from './intro/panels/intro-panel-11.jsx';
import IPanel12 from './intro/panels/intro-panel-12.jsx';
import IPanel13 from './intro/panels/intro-panel-13.jsx';
import IPanel14 from './intro/panels/intro-panel-14.jsx';
import IPanel15 from './intro/panels/intro-panel-15.jsx';
import IPanel16 from './intro/panels/intro-panel-16.jsx';


import SelectionScreen from './selection-screen/selection_screen.jsx';
import SelectionPlayerPanel from './selection-screen/selection-player-panel.jsx';
import SelectionCharacterProfile from './selection-screen/selection-character-profile.jsx';

import Battle from './battle/battle.jsx';

import Victory from './game-end/victory.jsx';
import GameOver from './game-end/game-over.jsx';

var Rebase = require('re-base');
var base = Rebase.createClass('https://sardonic-warriors.firebaseio.com');


var Game = React.createClass ({

    getInitialState: function() {
        var enemiesData = require('../data/enemies.jsx');
        return {

            characters: require('../data/characters.jsx'),
            unselectedCharacters: [],
            boss: enemiesData.gayathan,

            firstCharacter: {},
            secondCharacter: {},
            thirdCharacter: {},

            playerHighlighted: 1,
            characterIndexHighlighted: 0,

            text: "",

            selectCharacter: this.selectCharacter,
            updateSelectableCharacters: this.updateSelectableCharacters,
            resetPlayers: this.resetPlayers,
            resetBoss: this.resetBoss,

            renderSelectionProfile: this.renderSelectionProfile,
            renderFirstSelectionProfile: this.renderFirstSelectionProfile,
            renderSecondSelectionProfile: this.renderSecondSelectionProfile,
            renderThirdSelectionProfile: this.renderThirdSelectionProfile,
            renderPlayerPanel: this.renderPlayerPanel,

            setPlayerHighlighted: this.setPlayerHighlighted.bind(this),
            setCharacterIndexHighlighted: this.setCharacterIndexHighlighted.bind(this),

            size: this.size
        }
    },

    componentDidMount: function(){

        var localStorageRefFirstChar = localStorage.getItem('firstCharacter');

        if(localStorageRefFirstChar) {
            this.setState ({
                firstCharacter: JSON.parse(localStorageRefFirstChar)
            });
        }

        var localStorageRefSecondChar = localStorage.getItem('secondCharacter');

        if(localStorageRefSecondChar) {
            this.setState ({
                secondCharacter: JSON.parse(localStorageRefSecondChar)
            });
        }

        var localStorageRefThirdChar = localStorage.getItem('thirdCharacter');

        if(localStorageRefThirdChar) {
            this.setState ({
                thirdCharacter: JSON.parse(localStorageRefThirdChar)
            });
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        localStorage.setItem('firstCharacter', JSON.stringify(nextState.firstCharacter));
        localStorage.setItem('secondCharacter', JSON.stringify(nextState.secondCharacter));
        localStorage.setItem('thirdCharacter', JSON.stringify(nextState.thirdCharacter));
    },

    size: function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },

    updateSelectableCharacters: function(){
        var state = this.state,
            selectableCharacters = [];

        for (var key in state.characters){
            if(state.characters[key].player == 0){
                selectableCharacters.push(state.characters[key]);
            }
        }
        this.setState({
            unselectedCharacters: selectableCharacters
        });
    },


    resetPlayers: function() {
        for(var key in this.state.characters){
            this.state.characters[key].player = 0;
        }
        this.setState({

           characters: this.state.characters,
           firstCharacter: {},
           secondCharacter: {},
           thirdCharacter:{}
        });
    },


    renderPlayerPanel: function(player){
        return <SelectionPlayerPanel {...this.state} player={player}/>;
    },

    renderSelectionProfile: function(key, player){
        return <SelectionCharacterProfile key={key} index={key} player={player} {...this.state} />;
    },


    selectCharacter: function(key, player){
        var state = this.state,
            characters = state.characters,
            unselectedCharacters = state.unselectedCharacters,
            character;

        switch (player) {
            case 1:
                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    } else if (characters[loopkey].name == unselectedCharacters[key].name) {
                        character = characters[loopkey];
                        character.player = player;
                    }
                }
                this.setState({
                    firstCharacter: character,
                    characters: state.characters
                });
                break;
            case 2:
                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    } else if (characters[loopkey].name == unselectedCharacters[key].name) {
                        character = characters[loopkey];
                        character.player = player;
                    }
                }
                this.setState({
                    secondCharacter: character,
                    characters: state.characters
                });
                break;
            case 3:

                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    } else if (characters[loopkey].name == unselectedCharacters[key].name) {
                        character = characters[loopkey];
                        character.player = player;
                    }
                }
                this.setState({
                    thirdCharacter: character,
                    characters: state.characters
                });
        }
        this.updateSelectableCharacters();

    },

    setPlayerHighlighted: function(player){
        this.setState({
            playerHighlighted: player
        })
    },

    setCharacterIndexHighlighted: function(index){
        this.setState({
            characterIndexHighlighted: index
        });
    },

    renderTextBox: function(script, afterScript){
        ReactDom.render(
            <TextBox {...this.props} setTurn={this.setTurn} script={script} activePlayer={this.state.activePlayer} afterScript={afterScript}/>,
            document.getElementById("panel")
        );
    },

    resetBoss(){
        this.state.boss.hp = this.state.boss.maxHp;
        this.setState({
           boss: this.state.boss
        });
    },

    render: function() {

        return (
            <Router history={browserHistory} createElement={createElementFn(this.state)}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={StartScreen}></IndexRoute>
                    <Route path='intro' component={Intro}>
                        <IndexRoute component={IPanel1} ></IndexRoute>
                        <Route path='2' component={IPanel2}></Route>
                        <Route path='3' component={IPanel3}></Route>
                        <Route path='4' component={IPanel4}></Route>
                        <Route path='5' component={IPanel5}></Route>
                        <Route path='6' component={IPanel6}></Route>
                        <Route path='7' component={IPanel7}></Route>
                        <Route path='8' component={IPanel8}></Route>
                        <Route path='9' component={IPanel9}></Route>
                        <Route path='10' component={IPanel10}></Route>
                        <Route path='11' component={IPanel11}></Route>
                        <Route path='12' component={IPanel12}></Route>
                        <Route path='13' component={IPanel13}></Route>
                        <Route path='14' component={IPanel14}></Route>
                        <Route path='15' component={IPanel15}></Route>
                        <Route path='16' component={IPanel16}></Route>
                    </Route>
                    <Route path='selection-screen' component={ SelectionScreen }></Route>
                    <Route path='battle' component={Battle}></Route>
                    <Route path='game-over' component={GameOver}></Route>
                    <Route path='victory' component={Victory}></Route>


                </Route>
            </Router>
        )
    }
});

function createElementFn(parentProps) {
    return function(Component, props) {
        return <Component {...parentProps} {...props} />
    }
}




export default Game;