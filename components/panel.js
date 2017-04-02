import React from 'react';
import FontAwesome from 'react-fontawesome';


export default function Panel(props) {
    return <section className="panel panel-default ">
        <div className="panel-heading">
            <h2 className="panel-title"><FontAwesome name={props.icon} /> {props.title}</h2>
        </div>
        <div className="panel-body">{props.children}</div>
    </section>;
}