import React from 'react';
import Matrix from './matrix';

export default function TimelineMatrix(props) {
    const borderStyle = {
        border: `2px dotted ${borderColor(props.selectedIndex, props.index)}`,
        cursor: 'pointer'
    }
    return <div style={{...borderStyle, ...style}} onClick={() => props.switchFrame(props.index)}><Matrix {...props}/></div>
}

TimelineMatrix.propTypes = {
    switchFrame: React.PropTypes.func.isRequired
}

TimelineMatrix.defaultProps = {
    pixelSize: 5
}

const style = {
    float: "left",
}

const borderColor = (selectedIndex, index) => {
    if(selectedIndex === index) {
        return "pink";
    } else {
        return "white";
    }
}