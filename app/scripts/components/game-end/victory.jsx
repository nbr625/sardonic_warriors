import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import Game from '../game.jsx';

var GameOver = React.createClass({

    render: function() {
        return (
            <div className="victory-component">
                <div className="victory-text-1">This the victory component</div>
                <div className="victory-text-2"></div>
                <div className="victory-text-3"></div>
                <div className="victory-text-4"></div>
                <audio src="/music/intro-music.mp3" autoPlay loop></audio>
            </div>

        );
    }
});