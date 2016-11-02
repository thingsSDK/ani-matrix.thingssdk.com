const bitmapToJS = (bitmap, index) => `const bitmap_${index} = [${bitmap.toString()}];`

export const formatJS = animation => animation.map(bitmapToJS).join('\n');

const bitmapToCPP = (bitmap, index) => `static const uint8_t PROGMEM bitmap_${index}[] = {${bitmap.toString()}};`;

export const formatCPP = animation => animation.map(bitmapToCPP).join('\n');