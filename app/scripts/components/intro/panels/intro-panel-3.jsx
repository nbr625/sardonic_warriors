import React from 'react';
import { Link } from 'react-router';

export default class IPanel3 extends React.Component {
    render () {
        return (
            <div>
                <div>
                    Gayathri's cells charge with the unstable power. Her cells remember a
                    prehistoric structure and begin to morph her body to fit this forgotten
                    vessel.
                    Her skin hardens and segments into scales. Her teeth sharpen and enlarge,
                    no longer fitting her jaw. Her mouth extends forward and her eyes grow cold,
                    only defined by a sarcastic hunger.
                    She has been fully transformed into her final form. Gayatops stands before
                    everyone. She begins to destroy all of the fascilities.
                    Can you defeat the terror?
                </div>
                <Link to="selection-screen">Next</Link>
            </div>
        );
    }
}