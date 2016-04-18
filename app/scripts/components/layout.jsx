import React from 'react';
import { Link } from 'react-router';

import StartScreen from './start_screen.jsx';
import Battle from './battle.jsx';
import SelectionScreen from './selection_screen.jsx';
import Intro from './intro/intro.jsx';
import IPanel1 from './intro/panels/intro-panel-1.jsx';
import IPanel2 from './intro/panels/intro-panel-2.jsx';
import IPanel3 from './intro/panels/intro-panel-3.jsx';

export default class Layout extends React.Component {

    render () {
        return (
            <div>{this.props.children}</div>
        );
    }
}