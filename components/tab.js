import React from 'react';

export default function Tab(props) {
    const className = props.selectedLanguage === props.value ? "active" : ""
    return <li role="presentation" className={className}><a href="#" onClick={() => props.clickHandler(props.value)}>{props.title}</a></li>
}

Tab.propTypes = {
  selectedLanguage: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  clickHandler: React.PropTypes.func.isRequired
}