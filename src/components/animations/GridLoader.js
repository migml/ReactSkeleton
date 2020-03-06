import * as React from 'react';

export class GridLoader extends React.Component {

    render() {
        return <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
        </div>
    }
}