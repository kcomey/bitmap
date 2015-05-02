var fs = require('fs');
var bitmap = fs.readFileSync('test.bmp');

var bitmapObject = {};

bitmapObject.type = bitmap.toString('utf-8', 0, 2);
bitmapObject.size = bitmap.readInt32LE(2);
// Unused bits one and two
bitmapObject.startOfPixels = bitmap.readInt32LE(10);
bitmapObject.dibSize = bitmap.readInt32LE(14);
// Assume we have a WINDOWSBITMAPHEADER;
// How could we confirm this?
// Read the header, the first 2 bits are BM for windows
bitmapObject.width = bitmap.readInt32LE(18);
bitmapObject.height = bitmap.readInt32LE(22);
// Color planes. Should be one.
bitmapObject.colorDepth = bitmap.readInt16LE(28);
// Compression method.
// Image size.
// Horizontal resolution.
// Vertical resolution.
bitmapObject.paletteSize = bitmap.readInt32LE(46);
bitmapObject.palette = [];
var startColorPalette = 14 + bitmapObject.dibSize;

exports.readPalette = function () {
  // Read in the color palette, bitmapObject.paletteSize x 4 bytes per color
  for (var i = startColorPalette; i < (bitmapObject.paletteSize * 4) +
    startColorPalette; i += 4) {

    var colorObj = {
      red: bitmap.readUInt8(i),
      green: bitmap.readUInt8(i + 1),
      blue: bitmap.readUInt8(i + 2),
      alpha: bitmap.readUInt8(i + 3),
    };

    bitmapObject.palette.push(colorObj);
  }
  return bitmapObject.palette;
};

exports.transformPalette = function() {
  //var i = startColorPalette;
  var i = 54;
  for (var x = 0; x < bitmapObject.palette.length; x ++) {
    bitmap.writeUIntLE(transformColors(bitmapObject.palette[x].red), i, 1);
    bitmap.writeUIntLE(transformColors(bitmapObject.palette[x].green), (i + 1), 1);
    bitmap.writeUIntLE(transformColors(bitmapObject.palette[x].blue),
      (i + 2), 1);
    bitmap.writeUIntLE(transformColors(bitmapObject.palette[x].alpha), (i + 3), 1);

    i += 4;
  }

  //Am I looking for a callback here?
  function transformColors (byteColor) {
    byteColor = 255 - byteColor;
    return byteColor;
  }

  return bitmap;
}









