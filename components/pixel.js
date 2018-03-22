import React from 'react';
import PropTypes from 'prop-types'; 

export default function Pixel(props) {
  const defaultStyle = {width: props.pixelSize, height: props.pixelSize};
  const cursorStyle = props.mouseHandler ? editableStyle : regularStyle;
  const mouseEvent = event => props.mouseHandler ? props.mouseHandler(event, props.x, props.y) : () => {};
  const pixelStyle = props.on ? selectedStyle : style;
  return <div 
            style={{...defaultStyle, ...pixelStyle, ...cursorStyle}}
            onMouseDown={mouseEvent} 
            onMouseUp={mouseEvent} 
            onMouseMove={mouseEvent}
            >{props.children}</div>;
};

Pixel.propTypes = {
  pixelSize: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  on: PropTypes.bool.isRequired,
  mouseHandler: PropTypes.func
};

Pixel.defaultProps = {
  pixelSize: 20
};

const genericStyles = {
  display: "table-cell"
};

const style = Object.assign({backgroundColor: "#eee"}, genericStyles);

const selectedStyle = Object.assign({backgroundColor: "red"}, genericStyles);

const editableStyle = {
  cursor: "pointer"
};

const regularStyle = {
  cursor: "cursor"
};


