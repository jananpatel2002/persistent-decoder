class Decoder {
  constructor(cipher) {
    this._cipher = cipher;
    this._rebuildMaps();
  }

  get cipher() {
    return this._cipher;
  }

  _rebuildMaps() {
    this._encodeMap = {};
    this._decodeMap = {};

    this._cipher.split("").forEach((ch, index) => {
      this._encodeMap[String.fromCharCode(index + 97)] = ch;
      this._decodeMap[ch] = String.fromCharCode(index + 97);
    });
  }

  set cipher(newcipher) {
    this._cipher = newcipher;
    this._rebuildMaps();
  }

  encode(str) {
    let s = str.split("").map((x) => {
      if (x in this._encodeMap) {
        return this._encodeMap[x];
      } else {
        return x;
      }
    });
    return s.join("");
  }

  decode(str) {
    let s = str.split("").map((x) => {
      if (x in this._decodeMap) {
        return this._decodeMap[x];
      } else {
        return x;
      }
    });
    return s.join("");
  }
}

// now the decoderRing is just a subclass of decoder that initializes it with a
// rotated string
class DecoderRing extends Decoder {
  constructor(rotation) {
    let chars = [];
    for (let i = 0; i < 26; i++) {
      chars.push(String.fromCharCode(97 + ((i + rotation) % 26)));
    }
    let str = chars.join("");
    console.log(str);
    super(str);
  }
}

// and now it's trivial to make a much stronger decoder - random
class DecoderRandom extends Decoder {
  constructor() {
    // Make the alphabet and then shuffle it.
    let arr = [];
    for (let i = 97; i < 97 + 26; i++) {
      arr.push(String.fromCharCode(i));
    }
    let alpha = DecoderRandom.shuffle(arr).join("");
    super(alpha);
  }

  // Fisher-Yates shuffle, used for random decoder cipher below
  // This will be provided.
  static shuffle(array) {
    let m = array.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}

export { Decoder, DecoderRing, DecoderRandom };
