import React from 'react';
import Game from '../../game.jsx';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel4 extends React.Component {

    render () {

        document.body.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                this.props.resetPlayers();
                this.context.history.pushState(null, 'selection-screen');
            }
        });


        return (
            <div>
                <div className="story-text">
                    Her mouth extends forward with jagged teeth and her pupils become slits like rips made by sarcastic intent.
                </div>
                <div className="story-text">
                    Her final form is too awful. Everyone wants to ignore the even all together. But it only anger Gayathan.
                </div>
                <div className="story-text">
                    She thrashes the facilities with her enormous tails while cackling in the most unsettling way
                </div>
                <div className="story-text">
                    Who can rise up and defeat this terror?
                </div>
                <Link className="story-next-button" onClick={this.props.resetPlayers} to="selection-screen">Next</Link>
            </div>
        );
    }

}

reactMixin(IPanel4, History);
export default IPanel4;