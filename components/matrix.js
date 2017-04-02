import React from 'react';

import Row from './row';

import {upto} from './utils/upto';

/**
 * Creates a number of rows with a given amount of pixels
 *
 * @param {number} rows
 * @param {number} pixels
 */
function createRows(rows, pixels, bitmap, mouseHandler, pixelSize) {
  const rowsOfPixelComponents = upto(rows, i => <Row key={i} width={pixels} rowNumber={i} rowValue={bitmap[i]} mouseHandler={mouseHandler} pixelSize={pixelSize} />)
  return <div>{rowsOfPixelComponents}</div>;
}

export default function Matrix(props) {
  const style = {
    margin: "auto",
    width: props.pixelSize * props.width,
    height:  props.pixelSize * props.height
  };

  return <div style={{...style, ...props.style}}>{createRows(props.height, props.width, props.bitmap, props.mouseHandler, props.pixelSize)}</div>;
}

Matrix.propTypes = {
  pixelSize: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  bitmap: React.PropTypes.array.isRequired,
  mouseHandler: React.PropTypes.func,
  style: React.PropTypes.object
};

Matrix.defaultProps = {
  pixelSize: 20,
  width: 8,
  height: 8
};
