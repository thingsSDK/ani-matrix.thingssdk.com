import React from 'react';
import css, {merge} from 'next/css';

import Styles from './utils/styles';


export default function Pixel(props) {
  const mouseEvent = event => props.mouseHandler(event, props.x, props.y);
  const pixelStyle = props.on ? selectedStyle : style;
  const cursorStyle = props.mouseHandler ? editableStyle : regularStyle;
  return <div 
            {...merge(pixelStyle, cursorStyle)}
            onMouseDown={mouseEvent} 
            onMouseUp={mouseEvent} 
            onMouseMove={mouseEvent}
            draggable={false}>{props.children}</div>;
};

Pixel.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  on: React.PropTypes.bool.isRequired,
  mouseHandler: React.PropTypes.func
};

const genericStyles = {
  width: Styles.PIXEL_SIZE,
  height: Styles.PIXEL_SIZE,
  display: "table-cell"
};

const style = css(
  Object.assign({backgroundColor: "#eee"}, genericStyles)
);

const selectedStyle = css(
  Object.assign({backgroundColor: "red"}, genericStyles)
);

const editableStyle = css({
  cursor: "pointer"
});

const regularStyle = css({
  cursor: "cursor"
});


