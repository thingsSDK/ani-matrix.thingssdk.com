export const upto = (times, callback, index = 0, accumulator = []) => {
    if(index === times || times < index) return accumulator;
    else {
        accumulator.push(callback(index, times));
        const newIndex = index + 1;
        return upto(times, callback, newIndex, accumulator);
    }
}