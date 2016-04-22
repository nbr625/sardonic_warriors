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

import SelectionCharacterProfile from './selection-screen/selection-character-profile.jsx';

import Battle from './battle/battle.jsx';

var Rebase = require('re-base');
var base = Rebase.createClass('https://sardonic-warriors.firebaseio.com');

var Game = React.createClass ({

    size: function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },

    getInitialState: function() {
        return {

            characters: {},

            firstCharacter:{},
            secondCharacter:{},
            thirdCharacter:{},

            text: "",

            selectCharacter: this.selectCharacter,
            renderSelectionProfile: this.renderSelectionProfile,

            size: this.size
        }
    },

    componentDidMount: function(){
        base.syncState('characters', {
            context: this,
            state: 'characters'
        });

        var localStorageRef = localStorage.getItem('selectedCharacters');

        if(localStorageRef) {
            this.setState ({
                selectedCharacters: JSON.parse(localStorageRef)
            });
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        localStorage.setItem('selectedCharacters', JSON.stringify(nextState.selectedCharacters));
    },



    renderSelectionProfile: function(key, player){
        return <SelectionCharacterProfile key={key} index={key} player={player} {...this.state} />;
    },


    selectCharacter: function(key, player){
        var state = this.state,
            characters = state.characters;

        switch (player) {
            case 1:
                state.firstCharacter = characters[key];
                this.setState({
                    firstCharacter: state.firstCharacter
                });
            case 2:
                state.secondCharacter = characters[key];
                this.setState({
                    secondCharacter: state.secondCharacter
                });
            case 3:
                state.thirdCharacter = characters[key];
                this.setState({
                    thirdCharacter: state.thirdCharacter
                });
        }
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