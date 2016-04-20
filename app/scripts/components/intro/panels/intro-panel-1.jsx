import React from 'react';
import { Link } from 'react-router';

export default class IPanel1 extends React.Component {
    render () {
        return (
            <div>
                <div>
                    It is another day, the crew slowly filter into the building.
                    They commence their morning rituals. Some sacrificing grinds
                    to the coffee idols, others like Gayathri, lacking any sense
                    of decency begin to make as much noise as possible. As if to
                    remind themselves, "I am alive".
                    Some of the more hungover, Priankka grumble under their breath.
                    Just then hundred of meters  above the clouds, the clash between
                    humanmade pollution and barometric pressure cook up a pocket storm.
                </div>
                <Link to="intro/2">Next</Link>
            </div>
        );
    }
}