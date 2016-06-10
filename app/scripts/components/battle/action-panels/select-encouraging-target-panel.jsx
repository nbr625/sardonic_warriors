import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class SelectEncouragingTarget extends React.Component{


    render() {
        return (
            <div>
                <div id="text">Select Target</div>
                <div onClick={() => {this.props.screenHandler('attackP')}}>Back</div>
            </div>
        );
    }

}
