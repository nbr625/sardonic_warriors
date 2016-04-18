import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import StartScreen from './start_screen.jsx';

import characterList from '../data/characters.jsx'

import Layout from './layout.jsx'

import Intro from './intro/intro.jsx';
import IPanel1 from './intro/panels/intro-panel-1.jsx';
import IPanel2 from './intro/panels/intro-panel-2.jsx';
import IPanel3 from './intro/panels/intro-panel-3.jsx';

import SelectionScreen from './selection_screen.jsx';
import SelectedCharacterPanel from './selected-character-panel.jsx'
import CharacterProfile from './character-profile.jsx'

import Battle from './battle.jsx';

var Game = React.createClass ({

    getInitialState: function() {
        return {
            characters: require('../data/characters.jsx'),
            selectedCharacters: {},
            selectCharacter: this.selectCharacter,
            unselectCharacter: this.unselectCharacter,
            renderCharacterProfile: this.renderCharacterProfile,
            renderToSelectionPanel: this.renderToSelectionPanel
        }
    },

    renderCharacterProfile: function(key){
        return <CharacterProfile key={key} index={key} character={this.state.characters[key]} {...this.state} />;
    },

    renderToSelectionPanel: function(key){
        return <SelectedCharacterPanel key={key} index={key} selectedCharcter={this.state.selectedCharacters[key]}/>;

    },

    selectCharacter: function(character){
        this.setState(
            {selectedCharacters: this.selectedCharacters.concat(character)}
        )
    },

    unselectCharacter: function(selectedCharacter) {
        this.setState(
            {selectedCharacters: this.selectedCharacters.slice(selectedCharacter)}
        )
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