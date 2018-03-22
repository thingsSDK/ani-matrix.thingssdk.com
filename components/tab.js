import React from 'react';
import PropTypes from 'prop-types';

export default function Tab(props) {
    const className = props.selectedLanguage === props.value ? "active" : ""
    return <li role="presentation" className={className}><a href="#" onClick={() => props.clickHandler(props.value)}>{props.title}</a></li>
}

Tab.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired
}