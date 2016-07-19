import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';
import { History } from 'react-router';
import reactMixin from 'react-mixin';


class BossSprite extends React.Component{

    renderSprite() {
        var props = this.props,
            boss = props.boss,
            bossStatus = props.bossSpriteState,
            attackingBossSprite = "/images/" + boss.name.toLowerCase() + "_attacking.png",
            hurtBossSprite = "/images/" + boss.name.toLowerCase() + "_hurt.png",
            standingBossSprite = "/images/" + boss.name.toLowerCase() + "_standing.png",
            dyingBossSprite = "/images/" + boss.name.toLowerCase() + "_dying.png",
            deadBossSprite = "/images/" + boss.name.toLowerCase() + "_dead.png",
            attackingCharacter = {backgroundImage: 'url(' + attackingBossSprite + ')'},
            standingCharacter = {backgroundImage: 'url(' + standingBossSprite + ')'},
            dyingCharacter = {backgroundImage: 'url(' + dyingBossSprite + ')'},
            hurtCharacter = {backgroundImage: 'url(' + hurtBossSprite + ')'},
            deadCharacter = {backgroundImage: 'url(' + deadBossSprite + ')'};

        switch(bossStatus) {
            case 'standing':
                return <div style={standingCharacter} className={`standing-boss`}></div>;
                break;
            case 'attacking':
                return <div style={attackingCharacter} className={`attacking-boss targeting-player-${props.activeActionTarget.player}`}></div>;
            case 'hurt':
                return <div style={hurtCharacter} className={`hurt-boss`}></div>;
                break;
            case 'dying':
                return <div style={dyingCharacter} className={`dying-boss`}></div>;
                break;
            case 'dead':
                return <div style={deadCharacter} className={`dead-boss`}></div>;
        }

    }

    render() {
        var props = this.props,
            boss = props.boss;


        return (
            <div>
                <div>{boss.name} </div>
                {this.renderSprite()}
            </div>
        );
    }
}

export default BossSprite;
reactMixin(BossSprite, History);