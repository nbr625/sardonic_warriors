import React from 'react';
import { Link } from 'react-router';

export default class IPanel3 extends React.Component {
    render () {
        return (
            <div>
                <div className="story-text">
                    The thundering precipitates down to the unsuspecting dancer.
                    It takes less than a second to reach its target
                </div>
                <div className="story-text">
                    charge down to the point highest energy.
                    Gayathri's cells charge with the unstable power. Her cells remember
                </div>
                <div className="story-text">
                    a prehistoric structure and begin to morph her body to fit this forgotten
                    vessel.
                </div>
                <Link className="story-next-button" to="intro/4">Next</Link>
            </div>
        );
    }
}