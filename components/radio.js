import React from 'react';

const idForValue = value => `radio-${value}`;

export default props => <span>
                            <label htmlFor={idForValue(props.value)}>{props.value}</label>
                            <input id={idForValue(props.value)} type="radio" value={props.value} name={props.name} checked={props.checkedValue === props.value} onChange={props.onChange} />
                        </span>;
