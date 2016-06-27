import React from 'react';
import { Link } from 'react-router';
import Battle from './../battle.jsx';

export default class SelectHealTarget extends React.Component{


    render() {
        return (
            <div>
                <div className="select-target-text">Select Target</div>
                <div className="back-button" onClick={() => {this.props.screenHandler('attackP')}}>Back</div>
            </div>
        );
    }

}
