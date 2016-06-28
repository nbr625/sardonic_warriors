import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

export default class IPanel1 extends React.Component {


    render () {
        document.body.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                this.context.history.pushState(null, 'intro/2');
            }
        });
        return (
            <div>
                <div>
                    <div className="story-text">It is another day in Breakthrough Headquarters, the crew slowly filter into the building.The perinially joyous David marks the day.</div>
                    <div className="story-text">'Another day in Paradise', he crows. At the kitchen many can be seen waiting for their turn at the coffee altar.</div>
                    <div className="story-text">Gayathri can be spotted there, making loud, indistinguishable noises, which could be interpreted to mean: 'I am alive! hear me roar!'</div>
                    <div className="story-text">Meanwhile, hundred of meters  above the clouds, the clash between human-made pollution and barometric pressure brews a pocket storm.</div>
                </div>
                <Link className="story-next-button" to="intro/2">Next</Link>
            </div>
        );
    }
}

reactMixin(IPanel1, History);
export default IPanel1;