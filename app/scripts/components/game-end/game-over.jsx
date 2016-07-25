import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import Game from '../game.jsx';

var GameOver = React.createClass({

    getInitialState: function(){
        return {
            highlightHandler: this.highLightButton.bind(this),
            highlightedIndex: 0,
            pressEnterHandler: this.pressEnter.bind(this)
        }
    },

    componentDidMount: function(){
        window.addEventListener('keydown', this.state.highlightHandler);
        window.addEventListener('keydown', this.state.pressEnterHandler);
    },

    componentWillUnmount: function(){
        window.removeEventListener('keydown', this.state.highlightHandler);
        window.removeEventListener('keydown', this.state.pressEnterHandler);
    },

    highLightButton: function(e){
        var state = this.state,
            highlightedIndex = state.highlightedIndex,
            leftKey = 37, rightKey = 39;

        switch (e.keyCode){
            case leftKey:
            case rightKey:
                e.preventDefault();
                if(highlightedIndex == 0){
                    this.setState ({
                        highlightedIndex: 1
                    });
                } else {
                    this.setState ({
                        highlightedIndex: 0
                    });
                }
        }
    },

    pressEnter: function(e){
        var state = this.state;

        if (e.key == 'Enter' && state.highlightedIndex == 0){
            this.props.resetPlayers();
            this.props.updateSelectableCharacters();
            this.context.history.pushState(null, 'selection-screen');
        } else if (e.key == 'Enter' && state.highlightedIndex == 1){
            this.context.history.pushState(null, '/');
        }
    },

    render: function() {
        var selectionState,
            mainScreenState,
            highlightedIndex = this.state.highlightedIndex;

        if(highlightedIndex == 0){
            selectionState = 'highlighted';
            mainScreenState = 'non-highlighted';
        } else if(highlightedIndex == 1) {
            selectionState = 'non-highlited';
            mainScreenState = 'highlighted';
        }

        return (
            <div className="game-over game-over-component">
                <div className="game-over game-over-title">Game Over</div>
                <div className="game-over failed-breakthrough-warriors">You have failed the Breakthrough Warriors</div>
                <div className="game-over play-again">Would you like to attempt it again?</div>
                <div className={`game-over btn btn-danger selection-screen-route ${selectionState}`}>Selection Screen</div>
                <div className={`game-over btn btn-danger main-screen-route ${mainScreenState}`}>Main Screen</div>
                <audio src="/music/intro-music.mp3" autoPlay loop></audio>
            </div>

        );
    }

});


export default GameOver
reactMixin(GameOver, History);