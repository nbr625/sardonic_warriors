import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class InitialTextBox extends React.Component{

    constructor(props,context){
        super(props, context);
        var text = this.props.activeAction.initialText;
        this.state = {
            enterHandler: this.pressEnter.bind(this),
            activeTextIndex: 1,
            text: text,
            activeText: text[1]
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
            this.switchText();
        }
    }

    toBossDamageTextBox(){
        debugger;
        var props = this.props;
        props.hurtCharacterHandler(props.activeActionTarget.player);
        props.setBossSprite('attacking');
        props.screenHandler('damageTB');
    }

    switchText(){
        debugger;
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex + 1,
            props = this.props,
            size = props.size(text);
        if (activeTextIndex < size) {
            this.setState({
                activeText: text[activeTextIndex],
                activeTextIndex: activeTextIndex
            });
        } else {
            if(this.props.activePlayer == this.props.boss){
                props.damage(props.activeAction, props.activeActionTarget);
                this.toBossDamageTextBox();

            } else {
                if (props.activeAction.type === 'damaging') {
                    props.attackingCharacterHandler(this.props.activePlayer.player);
                    props.damage(props.activeAction, props.activeActionTarget);
                    props.setBossSprite('hurt');
                    props.screenHandler('damageTB');
                } else if (props.activeAction.type === 'healing') {
                    props.heal(props.activeAction , props.activeActionTarget);
                }
                this.props.attackingCharacterHandler(this.props.activePlayer.player);
            }

        }
    }


    render() {
        return (
            <div>
                <div className="battle-text-box-text">{this.state.activeText}</div>
                <div>Press Enter</div>
            </div>
        );
    }

}

export default InitialTextBox;
reactMixin(InitialTextBox, History);