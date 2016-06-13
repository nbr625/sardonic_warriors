import React from 'react';
import { Link } from 'react-router';

export default class IPanel2 extends React.Component {
    render () {
        return (
            <div>
                <div className="story-text">
                    It brews isotopic charges that violently
                    crackle around the sky, sondering for a high
                    source of energy to stabilize itself.
                </div>
                <div className="story-text">
                    Gayathri's cup has finished brewing. She takes it from
                    the coffee altar.
                    "Everyone can tell that Bollywood music,
                </div>
                <div className="story-text">
                    trumps all other genres. It is just so much to dance!"
                    As if to corroborate her point, she flails about like a
                </div>
                <div className="story-text">
                    possessed marionette. The spike of energy in the kitchen give the murderous cloud a target. Gayathri.
                </div>
                <Link to="intro/3">Next</Link>
            </div>
        );
    }
}
