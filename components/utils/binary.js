/**
 * Determins if the bit at position `position` is on (or 1 in binary) in the `value`  
 * 
 * @export
 * @param {int} position in the value to check
 * @param {int} value the integer to check
 * @returns {boolean}
 */

export function isOn(position, value) {
    return (value & 1 << position) > 0;
}
