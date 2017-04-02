import React from 'react';

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
  pixelSize: React.PropTypes.number.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  on: React.PropTypes.bool.isRequired,
  mouseHandler: React.PropTypes.func
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


