import React from 'react';
import { Link } from 'react-router';

export default class Intro extends React.Component {

    componentWillMount() {
        var images = ["./images/conference-room.png", "/images/kitchen.png", "/images/steve-laughing-right.png",
            "/images/snackbar.png", "/images/intro-pri-talking-left.png", "/images/brewing-storm.png",
            "/images/gayathri-talking-1.png", "/images/gayathan-laughing.png", "/images/thunder-clouds.png",
            "/images/gayathan-turning-0.png", "/images/gayathan-turning.png", "/images/gayathan-turned-2.png",
            "/images/gayathan-turned-1-cut.png", "/images/story-pri-scared.png", "/images/steve-terrified-left.png"];
        images =
            images.forEach((src) => {
                const img = document.createElement('img');
                img.src = src;
            });
    }
    render () {


        return (
            <div className="story-panel">
                <div className="intro-background-filter"></div>
                <img className="story-partchment-image" src="/images/partchment-horizontal-background.png"/>
                <div className="story-slide">{this.props.children}</div>
                <audio src="/music/intro-music.mp3" autoPlay loop></audio>
                <div className="hidden-image">
                    <img src="/images/intro-pri-talking-left.png"/>
                    <img src="/images/thunder-clouds.png"/>
                    <img src="/images/gayathan-turning-0.png"/>
                    <img src="/images/gayathan-turning.png"/>
                    <img src="/images/gayathan-turned-2.png"/>
                    <img src="/images/gayathan-turned-1-cut.png"/>
                    <img src="/images/story-pri-scared.png"/>
                    <img src="/images/steve-terrified-left.png"/>
                    <img src="/images/nico-pointing-intro.png"/>
                    <img src="/images/nico-roasted-intro.png"/>
                </div>
            </div>

        );
    }
}
