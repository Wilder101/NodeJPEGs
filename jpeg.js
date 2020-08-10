// 8/10/20
// Node JPEGs -- image creation using Node

// npm init -- initializer actally not required, yet is explicit for Node.js use
// npm install jpeg-js

// Encoding JEPGs

// Require jpeg-js npm package
var jpeg = require('jpeg-js');

// Standard js filestream
fs = require('fs');

// Set image dimensions
var width = 320,
    height = 180;

// Set image frame data
var frameData = new Buffer(width * height * 4);     
//Buffer method deprecated ***** update needed:
// (node:9376) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. 
// Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

// Loop through image
var i = 0;
while (i < frameData.length) {
  frameData[i++] = 0xff; // red
  frameData[i++] = 0x00; // green
  frameData[i++] = 0x00; // blue
  frameData[i++] = 0xff; // alpha - ignored in JPEGs
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
