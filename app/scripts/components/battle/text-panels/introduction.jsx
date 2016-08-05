import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class Introduction extends React.Component{

    constructor(props, context){
        super(props, context);
        var introText = [
            ["Gayathan Stands before the chosen heroes: " + this.props.firstCharacter.name,
                this.props.secondCharacter.name + " and " + this.props.thirdCharacter.name],
            ["Tho they are terrified, particularly " + this.props.secondCharacter.name + "...",
                "They rise to the task."]];
        this.state = {
            handler: this.pressEnter.bind(this),
            activeTextIndex: 0,
            text: introText,
            activeText: introText[0]
        };
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.handler);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.handler);
    }

    switchText(){
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex + 1,
            size = this.props.size(text);
        if (activeTextIndex < size) {
            this.setState({
                activeText: text[activeTextIndex],
                activeTextIndex: activeTextIndex
            });
        } else {
            this.props.screenHandler('PlayerP');
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.switchText();
        }
    }

    componentDidUpdate(params) {
        var el = ReactDOM.findDOMNode(this);
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

export default Introduction;
reactMixin(Introduction, History);