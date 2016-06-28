import React from 'react';
import { Link } from 'react-router';

export default class Intro extends React.Component {
    render () {
        return (
            <div className="story-panel">
                <div>{this.props.children}</div>
                <audio src="/music/intro-music.mp3" autoPlay loop></audio>
            </div>

        );
    }
}
