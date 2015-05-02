var myBitmap = require('../bitmap_header_module.js');
var expect = require('chai').expect;



describe('compare file size of transformed color palette to original color palette', function() {

  it('expect transformedColor function to change original object', function () {
    var original = myBitmap.readPalette();

    var transformed = myBitmap.transformPalette();

    expect(transformed).to.not.equal(original);

    expect(transformed.length).to.equal(original.length);
  });
});





