import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel2 extends React.Component {
    render () {

        document.body.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                this.context.history.pushState(null, 'intro/3');
            }
        });

        return (
            <div>
                <div className="story-text">
                    Synchronized with the burbling of the coffee machine, the isotopic charges crack the sky. It hungers for a high energy source to stabilize itself.
                </div>
                <div className="story-text">
                    "Everyone can tell that Bollywood music, trumps all other genres. It is just so much to dance," she says to a crowd that was not talking about dancing.
                </div>
                <div className="story-text">
                    As if to corroborate her point, she flails about like a possessed marionette. She doesn't know that she is dangerously elevating the funk levels of the room
                </div>
                <div className="story-text">
                    The positive charge of the kitchen climb until they perfectly match the negative charge crackling above the clouds. The isotopic anomaly has found its target.
                </div>
                <Link className="story-next-button" to="intro/3">Next</Link>
            </div>
        );
    }
}

reactMixin(IPanel2, History);
export default IPanel2;