import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class SelectHealTarget extends React.Component{


    render() {
        debugger;
        return (
            <div>
                <div id="text">Select Target</div>
                <div onClick={() => {this.props.screenHandler('attackP')}}>Back</div>
            </div>
        );
    }

}
