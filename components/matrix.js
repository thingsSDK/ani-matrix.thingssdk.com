import React from 'react';
import css from 'next/css';

import Row from './row';

import Styles from './utils/styles';

/**
 * Creates a number of rows with a given amount of pixels
 *
 * @param {number} rows
 * @param {number} pixels
 */
function createRows(rows, pixels, bitmap, pixelClick) {
  const rowsOfPixelComponents = [];
  for (let i = 0; i < rows; i ++) {
    rowsOfPixelComponents.push(<Row key={i} width={pixels} rowNumber={i} rowValue={bitmap[i]} pixelClick={pixelClick} />);
  }
  return <div>{rowsOfPixelComponents}</div>;
}

export default function Matrix(props) {
  return <div className={style}>{createRows(props.height, props.width, props.bitmap, props.pixelClick)}</div>;
}

Matrix.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  bitmap: React.PropTypes.array,
  pixelClick: React.PropTypes.func
};

Matrix.defaultProps = {
  width: Styles.DEFAULT_DIMENSIONS,
  height: Styles.DEFAULT_DIMENSIONS
};

const style = css({
  width: Styles.PIXEL_SIZE * Styles.DEFAULT_DIMENSIONS
});
