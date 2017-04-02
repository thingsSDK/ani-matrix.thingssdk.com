import React from 'react';

const idForValue = value => `radio-${value}`;

export default function Radio(props) { 
    return <div className="radio">
        <label htmlFor={idForValue(props.value)}>
            <input id={idForValue(props.value)} type="radio" value={props.value} name={props.name} checked={props.checkedValue === props.value} onChange={props.onChange} />
            {props.value}
        </label>
    </div>;
}
