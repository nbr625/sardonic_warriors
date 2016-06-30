import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';

class IPanel3 extends React.Component {


    constructor(props, context){
        super(props, context);
        this.state = {
            handler: this.pressEnter.bind(this)
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.resetPlayers();
            this.context.history.pushState(null, 'intro/4');
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.state.handler);

    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.state.handler);
    }

    render () {

        return (
            <div>
                <div className="story-text">
                    Lightning precipitates down to the unsuspecting dancer. It takes less than a second to reach the unsuspecting target
                </div>
                <div className="story-text">
                    Gayathri floods the room with blinding incandescence. Her cells charge with the unstable power. Her cells remember
                </div>
                <div className="story-text">
                    a prehistoric anatomical structure and begin to approximate this forgotten vessel. It fills her with sarcastic might!
                </div>
                <div className="story-text">
                    Her skin hardens and segments into scales, she is even more resilient to the criticism and pleas of mercy.
                </div>
                <Link className="story-next-button" to="intro/4">Next</Link>
                <audio src="/music/thunder.mp3" autoPlay></audio>
            </div>
        );
    }
}

reactMixin(IPanel3, History);
export default IPanel3;