const multiFrameAnimation = (lines, animationArray, interval) => {
  return `import { connect8x8Matrix } from '@thingssdk/ht16k33/espruino';

${lines}
const animation = [${animationArray}];

function main() {
    const matrix = connect8x8Matrix();
    let animationIndex = 0;
    setInterval(() => {
        //Get current frame
        const bitmap = animation[animationIndex];
        //Render frame
        matrix.render(bitmap);
        //Get the next frame index
        animationIndex ++;
        //Reset index to 0 if it's out of range
        if (animationIndex >= animation.length) animationIndex = 0;
    }, ${interval});
}`;
};

const singleFrame = (lines, animationArray) => {
  return `import { connect8x8Matrix } from '@thingssdk/ht16k33/espruino';

${lines}
const animation = [${animationArray}];

function main() {
    const matrix = connect8x8Matrix();
    //Get current frame
    const bitmap = animation[0];
    //Render frame
    matrix.render(bitmap);
}`;
};

const toJS = (lines, animationArray, animation, interval) => {
  if (animation.length > 1)
    return multiFrameAnimation(lines, animationArray, interval);
  else return singleFrame(lines, animationArray);
};

const bitmapToJS = (bitmap, index) =>
  `const bitmap_${index} = [${bitmap.toString()}];`;

const bitmapToArrayJS = (bitmap, index) => `bitmap_${index}`;

export const formatJS = (animation, interval) => {
  const lines = animation.map(bitmapToJS).join("\n");
  const animationArray = animation.map(bitmapToArrayJS).join(",");
  return toJS(lines, animationArray, animation, interval);
};

const multiFrameAnimationCPP = (animationArray, interval) => {
  return `#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

Adafruit_8x16minimatrix matrix = Adafruit_8x16minimatrix();

void setup() {
  matrix.begin(0x70);  // pass in the address
}

static const uint8_t PROGMEM
  animation[${animationArray.length}][8] =
  {
      ${animationArray.join(',\n      ')}
  };

void loop() {
  
  for(int i = 0; i < ${animationArray.length}; i++) {

    matrix.clear();
    matrix.drawBitmap(0, 0, animation[i], 8, 8, LED_ON);
    matrix.writeDisplay();
    delay(${interval});
    
  }
}`;
};

const bitmapToCPP = (bitmap, index) => `{${bitmap.toString()}}`;

export const formatCPP = (animation, interval) => multiFrameAnimationCPP(animation.map(bitmapToCPP), interval);