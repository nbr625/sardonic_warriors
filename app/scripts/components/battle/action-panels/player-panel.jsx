import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import Game from '../../game.jsx';
import reactMixin from 'react-mixin';

var PlayerPanel = React.createClass ({

    getInitialState: function(){
        return {
            enterHandler: this.pressEnter.bind(this),
            highlightHandler: this.highLightButton.bind(this),
            attackButtonStatus: 'highlighted',
            defendButtonStatus: 'non-highlighted',
            meditateButtonStatus: 'non-highlighted',
            encourageButtonStatus: 'non-highlighted'
        }
    },

    componentDidMount(){
        window.addEventListener('keydown', this.state.enterHandler);
        window.addEventListener('keydown', this.state.highlightHandler);

    },

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
        window.removeEventListener('keydown', this.state.highlightHandler);
    },

    highLightButton: function(e){
        var state = this.state,
            attackButtonStatus = state.attackButtonStatus,
            defendButtonStatus = state.defendButtonStatus,
            meditateButtonStatus = state.meditateButtonStatus,
            encourageButtonStatus = state.encourageButtonStatus,
            leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

        switch (e.keyCode){
            case leftKey:
            case upKey:
            case rightKey:
            case downKey:
                e.preventDefault();
                var audio = new Audio('/music/menu-selection-key.mp3');
                audio.play();
        }

        // Attack Button
        if(attackButtonStatus == 'highlighted') {
            switch(e.keyCode){
                case rightKey:
                    this.setState ({
                        attackButtonStatus: 'non-highlighted',
                        defendButtonStatus: 'highlighted'
                    });
                    break;
                case downKey:
                    this.setState ({
                        attackButtonStatus: 'non-highlighted',
                        meditateButtonStatus: 'highlighted'
                    });
                    break;
                case leftKey:
                    this.setState ({
                        attackButtonStatus: 'non-highlighted',
                        encourageButtonStatus: 'highlighted'
                    });
            }

        }

        // From Defend Button
        if(defendButtonStatus == 'highlighted') {
            switch (e.keyCode) {
                case leftKey:
                    this.setState({
                        defendButtonStatus: 'non-highlighted',
                        attackButtonStatus: 'highlighted'
                    });
                    break;
                case downKey:
                    this.setState({
                        defendButtonStatus: 'non-highlighted',
                        encourageButtonStatus: 'highlighted'
                    });
                    break;
                case rightKey:
                    this.setState({
                        defendButtonStatus: 'non-highlighted',
                        meditateButtonStatus: 'highlighted'
                    });

            }
        }


        // From Meditate Button
        if(meditateButtonStatus == 'highlighted') {
            switch (e.keyCode) {
                case upKey:
                    this.setState ({
                        meditateButtonStatus: 'non-highlighted',
                        attackButtonStatus: 'highlighted'
                    });
                    break;
                case rightKey:
                    this.setState ({
                        meditateButtonStatus: 'non-highlighted',
                        encourageButtonStatus: 'highlighted'
                    });
                    break;
                case leftKey:
                    this.setState ({
                        meditateButtonStatus: 'non-highlighted',
                        defendButtonStatus: 'highlighted'
                    });

            }
        }

        // From Encourage Button
        if(encourageButtonStatus == 'highlighted') {
            switch (e.keyCode) {
                case upKey:
                    this.setState({
                        encourageButtonStatus: 'non-highlighted',
                        defendButtonStatus: 'highlighted'
                    });
                    break;
                case leftKey:
                    this.setState({
                        encourageButtonStatus: 'non-highlighted',
                        meditateButtonStatus: 'highlighted'
                    });
                    break;
                case rightKey:
                    this.setState({
                        encourageButtonStatus: 'non-highlighted',
                        attackButtonStatus: 'highlighted'
                    });

            }
        }
    },


    pressEnter: function(e){
        var state = this.state;
        if (e.key == 'Enter'){
            if(state.attackButtonStatus == 'highlighted'){
                var audio = new Audio('/music/open-attack-menu.mp3');
                audio.play();
                this.props.screenHandler('attackP');
            } else if(state.defendButtonStatus == 'highlighted'){
                var audio = new Audio('/music/player-defending.mp3');
                audio.play();
                this.defend();
            } else if(state.meditateButtonStatus == 'highlighted'){
                var audio = new Audio('/music/player-meditating.mp3');
                audio.play();
                this.meditate();
            } else {
                var audio = new Audio('/music/open-attack-menu.mp3');
                audio.play();
                this.props.selectedCharacterHandler(1);
                this.props.screenHandler('selectET');
            }
        }
    },

    defend: function(){
        this.props.defend(this.props.activePlayer);
        this.props.screenHandler('defendTB');
    },

    meditate: function(){
        this.props.meditate(this.props.activePlayer);
        this.props.screenHandler('meditationTB');
    },


    render: function(){
        var state = this.state;
        var attackClasses = `btn btn-danger btn-attack ${state.attackButtonStatus}`,
            defendClasses = `btn btn-danger btn-defend ${state.defendButtonStatus}`,
            meditateClasses = `btn btn-danger btn-meditate ${state.meditateButtonStatus}`,
            encourageClasses = `btn btn-danger btn-encourage ${state.encourageButtonStatus}`;

        return (
            <div class="action-panel">
                <div className="player-name-attack-panel">{this.props.activePlayer.name}</div>
                <div className={attackClasses}>Attack</div>
                <div className={defendClasses}>Defend</div>
                <div className={meditateClasses}>Meditate</div>
                <div className={encourageClasses}>Encourage</div>
            </div>

        );
    }

});


reactMixin(PlayerPanel, History);
export default PlayerPanel;