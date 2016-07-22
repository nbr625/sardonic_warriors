import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class CharacterDiedPanel extends React.Component{

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
        if(e.keyCode == 'Enter'){
            var props = this.props;
            props.dyingCharacterHandler(0);
            props.setNextTurn();
            props.screenHandler('PlayerP');
        }
    }

    render() {
        return (
            <div>
                <div className="battle-text-box-text">{this.props.lastKilledCharacter.name} died. How sad...</div>
                <div>Press Enter</div>
            </div>
        );
    }
}

export default CharacterDiedPanel;
reactMixin(CharacterDiedPanel, History);
