import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class NotEnoughCourage extends React.Component{


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
            this.props.screenHandler('attackP');
        }
    }

    render() {
        var props = this.props,
            activePlayer = props.activePlayer,
            text = activePlayer.name + " doesn\'t have anough courage for attack. Select another action";
        return (
            <div>
                <div className="battle-text-box-text">{text}</div>
                <div>Press Enter</div>
            </div>
        );
    }
}

export default NotEnoughCourage;
reactMixin(NotEnoughCourage, History);