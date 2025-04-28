let hamming = require('../index.js').hamming;
let assert = require('chai').assert;
describe('Hamming code additional methods testing', function() {

  it('injectError flips the correct bit', function() {
    const original = [1, 0, 1, 1, 0, 0, 1];
    const position = 3;
    const expected = [1, 0, 0, 1, 0, 0, 1];
    const corrupted = hamming.injectError(original, position);
    for (let i = 0; i < 7; i++) {
      assert.equal(corrupted[i], expected[i]);
    }
  })

  it('isValid detects correct and incorrect codes', function() {
    const validCode = [0, 0, 0, 0, 0, 0, 0];
    const invalidCode = [0, 1, 0, 0, 0, 0, 0];
    assert.equal(hamming.isValid(validCode), true);
    assert.equal(hamming.isValid(invalidCode), false);
  })

  it('findErrorPosition returns correct error bit position', function() {
    const dataWithError = [1, 1, 1, 0, 0, 1, 0]; // помилка в 6-ій позиції
    const errorPos = hamming.findErrorPosition(dataWithError);
    assert.equal(errorPos, 6);
  })

})
describe('Hamming code testing', function() {
  it('posses encode() method', function() {
    assert.equal(hamming.encode != undefined, true);
  })

  it('posses decode() method', function() {
    assert.equal(hamming.decode != undefined, true);
  })

  it('does not posses encrypt() method', function() {
    assert.equal(hamming.encrypt == undefined, true);
  })

  it('encode correctly with proper input', function() {
    let dataToEncode = [0,0,0,0];
    let expectedEncoded = [0,0,0,0,0,0,0];
    let encoded = hamming.encode(dataToEncode);
    assert.equal(encoded.length == 7, true);
    for(let i = 0; i < 7; i++) {
      assert.equal(encoded[i], expectedEncoded[i]);
    }

    dataToEncode = [1,0,0,0];
    expectedEncoded = [1,1,1,0,0,0,0];
    encoded = hamming.encode(dataToEncode);
    assert.equal(encoded.length == 7, true);
    for(let i = 0; i < 7; i++) {
      assert.equal(encoded[i], expectedEncoded[i]);
    }

    dataToEncode = [0,1,0,0];
    expectedEncoded = [1,0,0,1,1,0,0];
    encoded = hamming.encode(dataToEncode);
    assert.equal(encoded.length == 7, true);
    for(let i = 0; i < 7; i++) {
      assert.equal(encoded[i], expectedEncoded[i]);
    }

    dataToEncode = [0,0,0,1];
    expectedEncoded = [1,1,0,1,0,0,1];
    encoded = hamming.encode(dataToEncode);
    assert.equal(encoded.length == 7, true);
    for(let i = 0; i < 7; i++) {
      assert.equal(encoded[i], expectedEncoded[i]);
    }
  })

  it('encode correctly with inproper input', function() {
    assert.throws(() => {
      let dataToEncode = [0,0,0,0,0];
      hamming.encode(dataToEncode);
      },
      Error
    );

    assert.throws(() => {
      let dataToEncode = [0,0,0];
      hamming.encode(dataToEncode);
      },
      Error
    );

    assert.throws(() => {
      let dataToEncode = [0,0,0,2];
      hamming.encode(dataToEncode);
      },
      Error
    );

    assert.throws(() => {
      let dataToEncode = [0,0,0,Nan];
      hamming.encode(dataToEncode);
      },
      Error
    );

    assert.throws(() => {
      let dataToEncode = [0,0,0,undefined];
      hamming.encode(dataToEncode);
      },
      Error
    );
  })

  it('decode correctly with proper input', function() {
    let dataToDecode = [0,0,0,0,0,0,0];
    let expectedDecoded = [0,0,0,0];
    let decoded = hamming.decode(dataToDecode);
    assert.equal(decoded.length == 4, true);
    for(let i = 0; i < 4; i++) {
      assert.equal(decoded[i], expectedDecoded[i]);
    }

    dataToDecode = [1,1,1,0,0,0,0];
    expectedDecoded = [1,0,0,0];
    decoded = hamming.decode(dataToDecode);
    assert.equal(decoded.length == 4, true);
    for(let i = 0; i < 4; i++) {
      assert.equal(decoded[i], expectedDecoded[i]);
    }

    dataToDecode = [1,0,0,1,1,0,0];
    expectedDecoded = [0,1,0,0];
    decoded = hamming.decode(dataToDecode);
    assert.equal(decoded.length == 4, true);
    for(let i = 0; i < 4; i++) {
      assert.equal(decoded[i], expectedDecoded[i]);
    }

    dataToDecode = [1,1,0,1,0,0,1];
    expectedDecoded = [0,0,0,1];
    decoded = hamming.decode(dataToDecode);
    assert.equal(decoded.length == 4, true);
    for(let i = 0; i < 4; i++) {
      assert.equal(decoded[i], expectedDecoded[i]);
    }
  })

  it('decode with error correction', function() {
    let dataToDecode = [1,1,0,1,0,1,1];
    let expectedDecoded = [0,0,0,1];
    let decoded = hamming.decode(dataToDecode);
    assert.equal(decoded.length == 4, true);
    for(let i = 0; i < 4; i++) {
      assert.equal(decoded[i], expectedDecoded[i]);
    }
  })

})
