import React from 'react';
import { Link } from 'react-router';
import Game from '../../game.jsx';
import Battle from '../battle.jsx';
import AttackPanel from './attack-panel.jsx'
import { History } from 'react-router';
import reactMixin from 'react-mixin';

var AttackBox = React.createClass({

    getInitialState: function(){
        return {
            enterHandler: this.pressEnter.bind(this)
        }
    },

    componentDidMount(){
        window.addEventListener('keydown', this.state.enterHandler);
    },

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
    },

    pressEnter: function(e){
        var props = this.props,
            attack = props.attacks[this.props.index],
            audio = new Audio('/music/enter-attack.mp3');

        if (e.key == 'Enter'){
            audio.play();
            if(props.index == props.highlightedIndex){
                if(attack.courageCost > props.activePlayer.courage){
                    props.screenHandler('notEC');
                } else if(attack.type === 'damaging'){
                    props.setAction(attack, props.boss);
                } else if(attack.type === 'healing'){
                    props.setAction(attack);
                }
            }

        }
    },

    render () {
        var props = this.props,
            attack = props.attacks[this.props.index],
            attackBox, attackStatus;

        if (attack.type === 'damaging') {
            attackBox = <span>{attack.name}</span>
        } else {
            attackBox = <span>{attack.name}</span>
        }
        var attackClass =  attack.type == 'damaging' ? 'btn-danger' : 'btn-info';


        if (this.props.index == this.props.highlightedIndex){
            attackStatus = 'highlighted';
        } else {
            attackStatus = 'non-highlighted'
        }


        return (
            <div className={`btn ${attackClass} single-attack-box ${attackStatus}`}>
                <div className="attack-title">{attackBox}</div>
                <div className="attack-courage-cost">{attack.courageCost}Courage</div>
            </div>
        );
    }

});

export default AttackBox
reactMixin(AttackBox, History);