import React from 'react';
import { Link } from 'react-router';
import Game from '../../game.jsx';
import Battle from '../battle.jsx';
import AttackBox from './attack-box.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';


var AttackPanel = React.createClass({

    getInitialState: function(){
        return {
            highlightHandler: this.highLightButton.bind(this),
            highlightedIndex: 0,
            pressEnterHandler: this.pressEnter.bind(this),
            pressBackHandler: this.pressBack.bind(this)
        }
    },

    componentDidMount(){
        window.addEventListener('keydown', this.state.highlightHandler);
        window.addEventListener('keydown', this.state.pressEnterHandler);
        window.addEventListener('keydown', this.state.pressBackHandler);
    },

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.highlightHandler);
        window.removeEventListener('keydown', this.state.pressEnterHandler);
        window.removeEventListener('keydown', this.state.pressBackHandler);
    },

    highLightButton: function(e){
        var state = this.state,
            highlightedIndex = state.highlightedIndex,
            leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

        switch (e.keyCode){
            case leftKey:
            case upKey:
            case rightKey:
            case downKey:
                e.preventDefault();
        }

        switch(highlightedIndex){

            // First Attack Button
            case 0:
                switch(e.keyCode){
                    case rightKey:
                        this.setState ({
                            highlightedIndex: 1
                        });
                        break;
                    case leftKey:
                        this.state ({
                            highlightedIndex: 4
                        });
                        break;
                    case downKey:
                        this.setState ({
                            highlightedIndex: 2
                        });
                }
                break;

            // Second Attack Button
            case 1:
                switch(e.keyCode){
                    case leftKey:
                        this.setState ({
                            highlightedIndex: 0
                        });
                        break;
                    case downKey:
                        this.setState ({
                            highlightedIndex: 3
                        });
                        break;
                    case rightKey:
                        this.setState ({
                            highlightedIndex: 2
                        });
                }
                break;

            // Third Attack Button
            case 2:
                switch(e.keyCode){
                    case leftKey:
                        this.setState ({
                            highlightedIndex: 1
                        });
                        break;
                    case downKey:
                        this.setState ({
                            highlightedIndex: 4
                        });
                        break;
                    case rightKey:
                        this.setState ({
                            highlightedIndex: 3
                        });
                        break;
                    case upKey:
                        this.setState ({
                            highlightedIndex: 0
                        });
                }
                break;

            // Fourth Attack Button
            case 3:
                switch(e.keyCode){
                    case leftKey:
                        this.setState ({
                            highlightedIndex: 2
                        });
                        break;
                    case downKey:
                        this.setState ({
                            highlightedIndex: 4
                        });
                        break;
                    case rightKey:
                        this.setState ({
                            highlightedIndex: 4
                        });
                        break;
                    case upKey:
                        this.setState ({
                            highlightedIndex: 1
                        });
                }
                break;

            // Back Button
            case 4:
                switch(e.keyCode){
                    case upKey:
                        this.setState ({
                            highlightedIndex: 2
                        });
                        break;
                    case leftKey:
                        this.setState ({
                            highlightedIndex: 3
                        });
                        break;
                    case rightKey:
                        this.setState({
                            highlightedIndex: 0
                        });
                }
        }
    },

    pressEnter: function(e){
        var state = this.state;

        if (e.key == 'Enter' && state.highlightedIndex == 4){
            this.props.screenHandler('PlayerP');
        }
    },

    pressBack(e){
        var props = this.props;
        if(e.keyCode == 8){
            e.preventDefault();
            props.screenHandler('PlayerP');
            props.selectedCharacterHandler(0)
        }
    },

    render: function(){
        var props = this.props,
            state = this.state,
            attacks = props.activePlayer.attacks,
            status;

        if(state.highlightedIndex == 4){
            status = 'highlighted-backbutton';
        } else {
            status = 'non-highlighted-backbutton';
        }

        return (
            <div>
                {Object.keys(attacks).map(function(key){
                    return <AttackBox key={key} index={key} attacks={attacks} highlightedIndex={state.highlightedIndex} {...props}/>;
                })}
                <div className={`back-button ${status}`}>Back</div>
            </div>
        );
    }

});

export default AttackPanel
reactMixin(AttackPanel, History);