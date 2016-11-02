import React from 'react';
import css from 'next/css';

import Styles from './utils/styles';


export default function Pixel(props) {
  return <div className={props.on ? selectedStyle : style} onClick={() => props.pixelClick(props.x, props.y)}>{props.children}</div>;
};

Pixel.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  on: React.PropTypes.bool.isRequired
};

const genericStyles = {
  width: Styles.PIXEL_SIZE,
  height: Styles.PIXEL_SIZE,
  float: 'left',
};

const style = css(
  Object.assign({backgroundColor: "#eee"}, genericStyles)
);

const selectedStyle = css(
  Object.assign({backgroundColor: "red"}, genericStyles)
);
