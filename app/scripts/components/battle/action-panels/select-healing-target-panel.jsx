import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class SelectHealTarget extends React.Component{

    constructor(props,context){
        super(props, context);
        this.state = {
            pressEnterHandler: this.pressEnter.bind(this),
            pressUpHandler: this.pressUp.bind(this),
            pressDownHandler: this.PressDown.bind(this),
            pressBackHandler: this.pressBack.bind(this)
        };
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.pressEnterHandler);
        window.addEventListener('keydown', this.state.pressUpHandler);
        window.addEventListener('keydown', this.state.pressDownHandler);
        window.addEventListener('keydown', this.state.pressBackHandler);


    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.pressEnterHandler);
        window.removeEventListener('keydown', this.state.pressUpHandler);
        window.removeEventListener('keydown', this.state.pressDownHandler);
        window.removeEventListener('keydown', this.state.pressBackHandler);
    }

    pressEnter(e){
        var props = this.props,
            selectedCharacter = props.selectedCharacter,
            setTarget = props.setTarget;
        if(e.key == 'Enter'){
            switch(selectedCharacter){
                case 1:
                    setTarget(props.firstCharacter);
                    break;
                case 2:
                    setTarget(props.secondCharacter);
                    break;
                case 3:
                    setTarget(props.thirdCharacter);

            }
        }
    }

    pressUp(e){
        var props = this.props,
            selectedCharacter = props.selectedCharacter,
            selectedCharacterHandler = props.selectedCharacterHandler;
        if(e.keyCode == 38){
            e.preventDefault();

            if(selectedCharacter == 1){
                selectedCharacterHandler(3);
            } else {
                selectedCharacterHandler(selectedCharacter - 1)
            }

        }
    }

    PressDown(e){
        var props = this.props,
            selectedCharacter = props.selectedCharacter,
            selectedCharacterHandler = props.selectedCharacterHandler;
        if(e.keyCode == 40){
            e.preventDefault();

            if(selectedCharacter == 3){
                selectedCharacterHandler(1);
            } else {
                selectedCharacterHandler(selectedCharacter + 1)
            }
        }
    }

    pressBack(e){
        var props = this.props;
        if(e.keyCode == 8){
            e.preventDefault();
            props.screenHandler('PlayerP');
            props.selectedCharacterHandler(0)
        }
    }



    render() {
        return (
            <div>
                <div className="select-target-text">Select Target</div>
                <div className="back-button">Back</div>
            </div>
        );
    }

}
