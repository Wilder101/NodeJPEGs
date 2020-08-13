// 8/10/20
// Node JPEGs -- image creation using Node

// npm init -- initializer actally not required, yet is explicit for Node.js use
// npm install jpeg-js

// Encoding JEPGs

// Require jpeg-js npm package
var jpeg = require('jpeg-js');

// Standard js filestream
fs = require('fs');

// Set constant image dimensions
const width  = 640,
      height = 320;

// Set maximum number of color values (256 total via 0 - 255 values)
const MAX = 255;

// Set image frame data
var frameData = new Buffer.alloc(width * height * 4);     

// Color reference:
// https://enchantia.com/software/graphapp/doc/tutorial/colours.htm
// frameData color can be in hexadecimal (0x00 - 0xFF) or integer values (0-255)

// Pixel object constructor function
function Pixel (red, green, blue) {
    this.Rcolor = red;
    this.Gcolor = green;
    this.Bcolor = blue;
}

// Create two dimensional array to represent an image
let picArray = [[]];
picArray.pop();         // Initialzed to empty

// Initialize to black
function initializePicArray(rows, cols) {

    // Create an outer array
    for (let i = 0; i < rows; i++) {

        // Create an inner filled array to push into the outer array
        let inner = [];
        inner.pop();

        for (let j = 0; j < cols; j++) {

            // Create new object to push
            let newObject = new Pixel(0, 0, 0);

            // HYPOTHESIS: THE SAME OBJECT IS BEING PUSHED TO THE ARRAY; THIS NEED TO BE A NEW OBJECT EACH TIME!!!
            inner.push(newObject);                          
        }

        // Push the inner array into the outer array element
        picArray.push(inner);
    }
}

initializePicArray(height, width);
console.log(initializePicArray);

// Random integer refresher: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//console.log(getRandomInt(3));
// expected output: 0, 1 or 2
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
// Assign colors to each image pixel function
function assignColors () {

    // Create a temporary pixel -- be careful to not use by reference
    // let tempPixel = {
    //     Rcolor: 0,      // red current color
    //     Gcolor: 0,      // green current color
    //     Bcolor: 0       // blue current color
    // };

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {

            picArray[i][j].Rcolor = getRandomInt(MAX + 1);
            picArray[i][j].Gcolor = getRandomInt(MAX + 1);
            picArray[i][j].Bcolor = getRandomInt(MAX + 1);
        }
    }
}

// Assign colors function call
assignColors();

// Test the image array
console.log(picArray[0][0]);
console.log(picArray[height / 2][width / 2]);
console.log(picArray[height - 1][width - 1]);

// frameData iterator & iterate through assigning framedata RBG values
var frameIterator = 0;
while (frameIterator < frameData.length) {

    // Assign colors to each frameData from each image pixel
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {

            frameData[frameIterator++] = picArray[i][j].Rcolor;
            frameData[frameIterator++] = picArray[i][j].Gcolor;
            frameData[frameIterator++] = picArray[i][j].Bcolor;
            frameData[frameIterator++] = MAX;    // alpha - ignored in JPEGs
        }
    }
}

// Image data
var rawImageData = {
  data: frameData,
  width: width,
  height: height,
};

// Encode image and log buffer data
var jpegImageData = jpeg.encode(rawImageData, 50);
console.log(jpegImageData);
/*
{ width: 320,
  height: 180,
  data: <Buffer 5b 40 29 ff 59 3e 29 ff 54 3c 26 ff 55 3a 27 ff 5a 3e 2f ff 5c 3c 31 ff 58 35 2d ff 5b 36 2f ff 55 35 32 ff 5a 3a 37 ff 54 36 32 ff 4b 32 2c ff 4b 36 ... > }
*/

// write to file
fs.writeFileSync('image.jpg', jpegImageData.data);
