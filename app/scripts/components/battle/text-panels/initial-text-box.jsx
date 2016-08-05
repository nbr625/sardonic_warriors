import React from 'react';
import ReactDOM from 'react-dom';
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
            activeTextIndex: 0,
            text: text,
            activeText: text[0],
            num: 0

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
        var props = this.props;
        props.hurtCharacterHandler(props.activeActionTarget.player);
        props.setBossSprite('attacking');
        props.screenHandler('damageTB');
    }

    switchText(){
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex + 1,
            props = this.props,
            size = props.size(text);

        if (activeTextIndex < size) {
            this.setState({
                activeText: text[activeTextIndex],
                activeTextIndex: activeTextIndex,
                num: this.state.num +1
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
    componentDidUpdate(params) {
        let el = ReactDOM.findDOMNode(this);
        if (this.state.activeTextIndex % 2 == 0) {
            el.classList.remove('battle-text-box-text-0');
            el.classList.add('battle-text-box-text-1');
        } else {
            el.classList.remove('battle-text-box-text-1');
            el.classList.add('battle-text-box-text-0');
        }
    }

    render() {
        var state = this.state;

        return (
            <div>
                <div className={`battle-text-box-text-${ Math.abs(state.activeTextIndex % 2)}`}>{state.activeText[0]}</div>
                <div className={`battle-text-box-text-${ Math.abs(state.activeTextIndex % 2)}`}>{state.activeText[1]}</div>
                <div className="text-enter-button">Press Enter</div>
            </div>
        );
    }

}

export default InitialTextBox;
reactMixin(InitialTextBox, History);