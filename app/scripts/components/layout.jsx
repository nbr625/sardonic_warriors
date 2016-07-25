import React from 'react';
import { Link } from 'react-router';

export default class StartScreen extends React.Component {

    render () {
        return (
            <div>
                <div className="panel-heading">
                    <h3 className="panel-title">Sardonic Warriors</h3>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}