import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class CharacterDamageTextBox extends React.Component{


    constructor(props,context){
        super(props, context);
        this.state = {
            enterHandler: this.pressEnter.bind(this)
        };
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.enterHandler);

    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.enterHandler);
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.nextPanel();
        }
    }


    nextPanel(){
        var props = this.props;
        props.attackingCharacterHandler(0);
        if(props.activeActionTarget.status == 'dead'){
            return props.screenHandler('characterD', props.activeActionTarget);

        } else {
            if (props.activePlayer == props.boss){
                props.hurtCharacterHandler(0);
                props.setBossSprite('standing');
                if (props.activeActionTarget.hp > 0){
                    props.setNextTurn()
                } else {
                    props.killCharacter(props.activeActionTarget);
                }
            } else if (props.activeActionTarget.hp > 0){
                props.setBossSprite('standing');
                props.dyingCharacterHandler(0);
                props.setNextTurn();
            } else {
                props.setBossSprite('dying');
                props.setVictory();
            }

        }
    }


    render() {
        var props = this.props,
            activeActionTarget = props.activeActionTarget,
            activePlayer = props.activePlayer,
            text = '';

        switch(this.props.activeAction.type){
            case 'damaging':
                text = activeActionTarget.name + " takes " + props.lastDamage + " points of damage";
                break;
            case 'healing':
                text = activePlayer.name + " restores " + activeActionTarget.name + "\'s morale by " + props.lastHeal;
                break;
        }



        return (
            <div>
                <div className="battle-text-box-text">{text}</div>
                <div>Press Enter</div>
            </div>
        );
    }
}

export default CharacterDamageTextBox;
reactMixin(CharacterDamageTextBox, History);