import React from 'react';
import Pixel from "./pixel";

import {isOn} from './utils/binary';
import {upto} from './utils/upto';

const createPixelAtIndex = (rowNumber, value, mouseHandler, pixelSize) => index => <Pixel key={`${index}-${rowNumber}`} x={index} y={rowNumber} on={isOn(index, value)} mouseHandler={mouseHandler} pixelSize={pixelSize} />;

/**
 * Creates a row full of pixels
 * 
 * @param {number} rowNumber 
 * @param {number} pixels 
 * @param {number} value 
 * @param {function} mouseHandler 
 * @returns {JSX.Element} row for the matrix
 */
function createRow(rowNumber, pixels, value, mouseHandler, pixelSize) {   
    const partialPixel = createPixelAtIndex(rowNumber, value, mouseHandler, pixelSize);
    const pixelComponents = upto(pixels, partialPixel);
    return <div style={style}>{pixelComponents}</div>;
}

export default (props) => {
    return createRow(props.rowNumber, props.width, props.rowValue, props.mouseHandler, props.pixelSize);
}

const style = {
    clear: "both"
};
