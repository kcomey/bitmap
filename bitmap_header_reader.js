'use strict';

var fs = require('fs');
//this file has some functions that I have exported
var myBitmap = require('./bitmap_header_module.js');

myBitmap.readPalette();

var bitmap = myBitmap.transformPalette();

// Write out the new file
fs.writeFileSync('test2.bmp', bitmap, 'binary');










