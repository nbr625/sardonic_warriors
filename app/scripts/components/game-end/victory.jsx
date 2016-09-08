import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import Game from '../game.jsx';

var Victory = React.createClass({

    getInitialState: function(){
        debugger;
        var firstChar = this.props.firstCharacter,
            secChar = this.props.secondCharacter,
            thirdChar = this.props.thirdCharacter;
        return {
            firstCharacter: firstChar,
            secondCharacter: secChar,
            thirdCharacter: thirdChar,
            rolling: true
        }
    },

    componentDidMount: function() {
        var self = this;
        setTimeout(() => {self.context.history.pushState(null, '/');}, 45000);
    },

    render: function() {

        var state = this.state,
            firstCharacter = state.firstCharacter,
            secondCharacter = state.secondCharacter,
            thirdCharacter = state.thirdCharacter,
            firstCharWaving = "/images/" + firstCharacter.name.toLowerCase() + "_selected.png",
            firstCharWavingStyles ={backgroundImage: 'url(' + firstCharWaving + ')'},
            secondCharWaving = "/images/" + secondCharacter.name.toLowerCase() + "_selected.png",
            secondCharWavingStyles ={backgroundImage: 'url(' + secondCharWaving + ')'},
            thirdCharWaving = "/images/" + thirdCharacter.name.toLowerCase() + "_selected.png",
            thirdCharWavingStyles ={backgroundImage: 'url(' + thirdCharWaving + ')'},
            heroSentence = `The great foe fell, ${firstCharacter.name}, ${secondCharacter.name} and ${thirdCharacter.name} became the heroes for the day.`;

        return (
            <div className="victory-component">
                <div className="victory-partchment">
                    <img src="/images/old-partchment-background.png" className="victory-background"/>
                    <div>
                        <div className="victory-text">This the victory component</div>
                        <div className="victory-text">{heroSentence}</div>
                        <div className="victory-text">Nico and Steve bragged about how much better they could have done the job</div>
                        <div className="victory-text">Gayathri was taken to the server room so that she could have a polyphasic nap. When she rose, she felt much better</div>
                        <div className="victory-text">{firstCharacter.endGameSummary}</div>
                        <div className="victory-text">{thirdCharacter.endGameSummary}</div>
                        <div className="victory-text">{secondCharacter.endGameSummary}</div>
                        <div className="victory-text">Special thanks to:</div>
                        <div className="victory-text">Steve, Pri and Gayathri</div>
                        <div className="victory-text">Roman for consultation</div>
                        <div className="victory-text">Olga for pointers on Refactoring</div>
                        <div className="victory-text">And Everyone in Breakthrough for showing me their colors.</div>
                        <div className="victory-roman"></div>
                        <div className="victory-pri"></div>
                        <div className="victory-ph"></div>
                        <div className="victory-murat"></div>
                        <div className="victory-bryan"></div>
                        <div className="victory-andy"></div>
                        <div className="victory-andrew"></div>
                        <div className="victory-oleg"></div>
                        <div className="victory-first-char" style={firstCharWavingStyles}></div>
                        <div className="victory-second-char" style={secondCharWavingStyles}></div>
                        <div className="victory-third-char" style={thirdCharWavingStyles}></div>
                        <div className="the-end">The End</div>
                    </div>
                    <audio src="/music/victory-music.mp3" autoPlay loop></audio>
                </div>
            </div>

        );
    }
});

reactMixin(Victory, History);
export default Victory;