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
function createRow(rowNumber, pixels, value, mouseHandler) {   
    const pixelsComponents = [];
    for(let i = 0; i < pixels; i ++) {
        pixelsComponents.push(<Pixel key={`${i}-${rowNumber}`} x={i} y={rowNumber} on={isOn(i, value)} mouseHandler={mouseHandler} />);
    }
    return <div className={style} draggable={false}>{pixelsComponents}</div>;
}

export default (props) => {
    return createRow(props.rowNumber, props.width, props.rowValue, props.mouseHandler);
}

const style = css({
    clear: "both"
});
