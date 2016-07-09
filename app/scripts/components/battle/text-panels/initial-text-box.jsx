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

    switchText(){
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
            if (props.activeAction.type === 'damaging') {
                props.damage(props.activeAction, props.activeActionTarget);
            } else if (props.activeAction.type === 'healing') {
                props.heal(props.activeAction , props.activeActionTarget);
            }
            props.screenHandler('damageTB');
            this.props.attackingCharacterHandler(0);

        }
    }


    render() {
        this.props.attackingCharacterHandler(this.props.player);
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