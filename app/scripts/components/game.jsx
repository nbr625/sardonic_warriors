import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createHistory from '../../../node_modules/history/lib/createHashHistory'

import StartScreen from './start-screen/start_screen.jsx';

import Layout from './layout.jsx'

import Intro from './intro/intro.jsx';
import IPanel1 from './intro/panels/intro-panel-1.jsx';
import IPanel2 from './intro/panels/intro-panel-2.jsx';
import IPanel3 from './intro/panels/intro-panel-3.jsx';

import SelectionScreen from './selection-screen/selection_screen.jsx';
import SelectionPlayerPanel from './selection-screen/selection-player-panel.jsx';
import SelectionCharacterProfile from './selection-screen/selection-character-profile.jsx';

import Battle from './battle/battle.jsx';

var Rebase = require('re-base');
var base = Rebase.createClass('https://sardonic-warriors.firebaseio.com');

var Game = React.createClass ({


    getInitialState: function() {

        return {

            characters: {},

            firstCharacter: {},
            secondCharacter: {},
            thirdCharacter: {},
            gayathan: {},

            text: "",

            resetPlayers: this.resetPlayers,
            selectCharacter: this.selectCharacter,

            renderSelectionProfile: this.renderSelectionProfile,
            renderFirstSelectionProfile: this.renderFirstSelectionProfile,
            renderSecondSelectionProfile: this.renderSecondSelectionProfile,
            renderThirdSelectionProfile: this.renderThirdSelectionProfile,
            renderPlayerPanel: this.renderPlayerPanel,

            size: this.size
        }
    },

    componentDidMount: function(){

        base.syncState('/characters', {
            context: this,
            state: 'characters'
        });

        base.syncState('/gayathan', {
            context: this,
            state: 'gayathan'
        });


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
            characters = state.characters;

        switch (player) {
            case 1:
                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    }

                }
                characters[key].player = player;
                state.firstCharacter = characters[key];
                this.setState({
                    firstCharacter: state.firstCharacter,
                    characters: state.characters
                });

                break;
            case 2:
                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    }

                }
                characters[key].player = player;
                state.secondCharacter = characters[key];
                this.setState({
                    secondCharacter: state.secondCharacter,
                    characters: state.characters
                });
                break;
            case 3:

                for (var loopkey in characters){
                    if(characters[loopkey].player == player){
                        characters[loopkey].player = 0;
                    }

                }
                characters[key].player = player;
                state.thirdCharacter = characters[key];
                this.setState({
                    thirdCharacter: state.thirdCharacter,
                    characters: state.characters
                });
        }

    },

    damageGayathan: function(attack){
        this.state.gayathan -= attack.damage;
        this.setState({
            gayathan: this.state.gayathan
        });
        this.renderTextBox(attack.finalText, setTurn);
    },

    renderTextBox: function(script, afterScript){
        ReactDom.render(
            <TextBox {...this.props} setTurn={this.setTurn} script={script} activePlayer={this.state.activePlayer} afterScript={afterScript}/>,
            document.getElementById("panel")
        );
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
                    </Route>
                    <Route path='selection-screen' component={ SelectionScreen }></Route>
                    <Route path='battle' component={Battle}></Route>

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