import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

class Introduction extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            activeTextIndex: 1,
            text: {
                1: "Gayathan Stands before the chosen heroes: " + this.props.firstCharacter.name,
                2: this.props.secondCharacter.name + " and " + this.props.thirdCharacter.name,
                3: "Tho they are terrified, particularly " + this.props.secondCharacter.name + "...",
                4: "They rise to the task." },
            activeText: "Gayathan Stands before the chosen heroes " + this.props.firstCharacter.name
        };
    }

    switchText(){
        var text = this.state.text,
            activeTextIndex = this.state.activeTextIndex + 1,
            size = this.props.size(text);
        if (activeTextIndex <= size) {
            this.setState({
                activeText: text[activeTextIndex],
                activeTextIndex: activeTextIndex
            });
        } else {
            this.props.screenHandler('PlayerP');
        }
    }
    render() {
        document.body.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                this.switchText();
            }
        });
        return (
            <div>
                <div className="battle-text-box-text">{this.state.activeText}</div>
                <div onClick={()=>{this.switchText()}}>Next</div>
            </div>
        );
    }

}

export default Introduction;