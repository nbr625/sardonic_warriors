import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import PlayerSprite from './player-sprites.jsx';

class PlayerSpritePanel extends React.Component{


    render() {
        var props = this.props;

        return (
            <div>
                <PlayerSprite character={props.firstCharacter} player={1} {...props} />
                <PlayerSprite character={props.secondCharacter} player={2} {...props} />
                <PlayerSprite character={props.thirdCharacter} player={3} {...props} />
            </div>
        );
    }
}

export default PlayerSpritePanel;
reactMixin(PlayerSpritePanel, History);