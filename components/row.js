import React from 'react';
import css from "next/css";


import Pixel from "./pixel";

import {isOn} from './utils/binary';

/**
 * Creates a row full of pixels
 * 
 * @param {number} pixels - number of pixels in a row
 * @returns array
 */
function createRow(rowNumber, pixels, value, pixelClick) {   
    const pixelsComponents = [];
    for(let i = 0; i < pixels; i ++) {
        pixelsComponents.push(<Pixel key={`${i}-${rowNumber}`} x={i} y={rowNumber} on={isOn(i, value)} pixelClick={pixelClick} />);
    }
    return <div className={style}>{pixelsComponents}</div>;
}

export default (props) => {
    return createRow(props.rowNumber, props.width, props.rowValue, props.pixelClick);
}

const style = css({
    clear: "both"
});
