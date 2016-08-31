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
        if (props.activePlayer == props.boss){
            props.hurtCharacterHandler(0);
            props.setBossSprite('standing');
            if (props.activeActionTarget.hp > 0){
                props.returningCharacterHandler(props.activeActionTarget.player);
                props.setNextTurn()
            } else {
                props.dyingCharacterHandler(props.activeActionTarget.player);
                props.screenHandler('characterD');
            }
        } else if (props.activeActionTarget.hp > 0){
            props.attackingCharacterHandler(0);
            props.returningCharacterHandler(props.activePlayer.player);
            props.setBossSprite('returning');
            props.setNextTurn();
        } else {
            this.props.returningCharacterHandler(props.activePlayer.player);
            props.attackingCharacterHandler(0);
            props.setBossSprite('dying');
            props.setNextTurn();
        }


    }

    renderSound(){
        var props = this.props;
        if (props.activeAction.type ==  'damaging') {
            return <audio src={`/music/${props.activePlayer.name}-attacking.mp3`} autoPlay></audio>
        } else {
            return <audio src={`/music/player-healing.mp3`} autoPlay></audio>
        }
    }

    render() {
        var props = this.props,
            activeActionTarget = props.activeActionTarget,
            activePlayer = props.activePlayer,
            player = activePlayer.name.toLowerCase(),
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
                <div className="character-damage-text-box-text" id={player}>{text}</div>
                <div className="text-enter-button" id={player}>Press Enter</div>
                {this.renderSound()}
            </div>
        );
    }
}

export default CharacterDamageTextBox;
reactMixin(CharacterDamageTextBox, History);