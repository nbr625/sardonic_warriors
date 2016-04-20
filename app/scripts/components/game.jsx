import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createHistory from '../../../node_modules/history/lib/createHashHistory'

import StartScreen from './start_screen.jsx';

import Layout from './layout.jsx'

import Intro from './intro/intro.jsx';
import IPanel1 from './intro/panels/intro-panel-1.jsx';
import IPanel2 from './intro/panels/intro-panel-2.jsx';
import IPanel3 from './intro/panels/intro-panel-3.jsx';

import SelectionScreen from './selection-screen/selection_screen.jsx';
import SelectedCharacterPanel from './selection-screen/selected-character-panel.jsx';
import CharacterProfile from './character-profile.jsx';
import CharacterSprite from './character-sprite.jsx';

import Battle from './battle.jsx';

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
            selectedCharacters: {},
            text: "",
            selectCharacter: this.selectCharacter,
            unselectCharacter: this.unselectCharacter,
            renderCharacterProfile: this.renderCharacterProfile,
            renderToSelectionPanel: this.renderToSelectionPanel,
            renderSprites: this.renderSprites,
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

    renderCharacterProfile: function(key){
        return <CharacterProfile key={key} index={key} {...this.state} />;
    },

    renderSprites:  function(key){
        return <CharacterSprite key={key} index={key} {...this.state} />;
    },

    selectCharacter: function(key){
        var selectedCharacters = this.state.selectedCharacters;
        if (this.size(selectedCharacters) < 3) {
            selectedCharacters[key] = this.state.characters[key];
            this.setState({
                selectedCharacters: selectedCharacters
            });
        } else {
            this.setState({
                text: "You can only choose three!"
            });
            console.log(this.state.text);
        }

        console.log(this.state.selectedCharacters);
    },

    unselectCharacter: function(character) {
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