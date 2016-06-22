import React from 'react';
import { Link } from 'react-router';

export default class IPanel2 extends React.Component {
    render () {
        return (
            <div>
                <div className="story-text">
                    Synchronized with the burbling of the coffee machine, the isotopic charges crack the sky. It hungers for a high energy source to stabilize itself.
                </div>
                <div className="story-text">
                    "Everyone can tell that Bollywood music, trumps all other genres. It is just so much to dance!"
                </div>
                <div className="story-text">
                    trumps all other genres. It is just so much to dance!" As if to corroborate her point, she flails about like a
                </div>
                <div className="story-text">
                    possessed marionette. The spike of energy in the kitchen give the murderous cloud a target. Gayathri.
                </div>
                <Link className="story-next-button" to="intro/3">Next</Link>
            </div>
        );
    }
}
