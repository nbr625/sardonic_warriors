import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import Game from '../game.jsx';

var Victory = React.createClass({

    render: function() {
        return (
            <div className="victory-component">
                <div className="victory-partchment">
                    <img src="/images/old-partchment-background.png" className="victory-background"/>
                    <div>
                        <div className="victory-text">This the victory component</div>
                        <div className="victory-text">The great foe fell, firstChar, secondChar and thirdCharacter became the heroes for the day.</div>
                        <div className="victory-text">Nico and Steve bragged about how much better they could have done the job</div>
                        <div className="victory-text">Gayathri was taken to the server room so that she could have a polyphasic nap. When she rose, she felt much better</div>
                        <div className="victory-text">{this.props.firstCharacter.endGameSummary}</div>
                        <div className="victory-text">{this.props.secondCharacter.endGameSummary}</div>
                        <div className="victory-text">{this.props.secondCharacter.endGameSummary}</div>
                        <div className="victory-text">Special thanks to:</div>
                        <div className="victory-text">Steve, Pri and Gayathri</div>
                        <div className="victory-text">Roman for consultation</div>
                        <div className="victory-text">Olga for pointers on Refactoring</div>
                        <div className="victory-text">And Everyone in Breakthrough for showing me their colors.</div>
                        <div className="victory-text">Thank you</div>
                        <div src="/images/roman_attacking.png" className="victory-roman"></div>
                        <div src="/images/pri_selected.png" className="victory-pri"></div>
                        <div src="/images/ph_walking.png" className="victory-ph"></div>
                        <div src="/images/murat_attacking.png" className="victory-murat"></div>
                        <div src="/images/bryan_attacking.png" className="victory-bryan"></div>
                        <div src="/images/andy_walking.png" className="victory-andy"></div>
                        <div src="/images/andrew_selected.png" className="victory-andrew"></div>
                        <div src="/images/oleg_attacking.png" className="victory-oleg"></div>
                    </div>
                    <div className="the-end">The End</div>
                    <audio src="/music/victory-music.mp3" autoPlay loop></audio>
                </div>
            </div>

        );
    }
});

export default Victory
reactMixin(Victory, History);