import React from 'react';
import { Link } from 'react-router';

export default class IPanel4 extends React.Component {
    render () {
        return (
            <div>
                <div className="story-text">
                    Her skin hardens and segments into scales. Her teeth sharpen and enlarge,
                    no longer fitting her jaw.
                </div>
                <div className="story-text">
                    Her mouth extends forward and her eyes grow cold,
                    only defined by a sarcastic hunger.
                    She has been
                </div>
                <div className="story-text">
                    fully transformed into her final form. Gayatops stands before everyone. She begins to destroy all of the fascilities.

                </div>
                <div className="story-text">Can you defeat the terror?</div>
                <Link to="selection-screen">Next</Link>
            </div>
        );
    }
}