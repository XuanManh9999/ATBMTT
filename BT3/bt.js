// Đối tượng lưu trữ các cặp giá trị của văn bản rõ và văn bản mã hóa
const substitutionPairs = {
  A: 'P',
  B: 'H',
  C: 'Q',
  D: 'G',
  E: 'I',
  F: 'U',
  G: 'M',
  H: 'E',
  I: 'A',
  J: 'Y',
  K: 'L',
  L: 'N',
  M: 'O',
  N: 'F',
  O: 'D',
  P: 'X',
  Q: 'J',
  R: 'K',
  S: 'R',
  T: 'C',
  U: 'V',
  V: 'S',
  W: 'T',
  X: 'Z',
  Y: 'W',
  Z: 'B',
};

// Hàm mã hóa văn bản
function encrypt(plaintext) {
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext[i].toUpperCase();
    if (substitutionPairs[char]) {
      ciphertext += substitutionPairs[char];
    } else {
      ciphertext += char;
    }
  }
  return ciphertext;
}

// Hàm giải mã văn bản
function decrypt(ciphertext) {
  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i].toUpperCase();
    let found = false;
    for (let key in substitutionPairs) {
      if (substitutionPairs[key] === char) {
        plaintext += key;
        found = true;
        break;
      }
    }
    if (!found) {
      plaintext += char;
    }
  }
  return plaintext;
}

// Hàm dịch vòng
function caesarShift(text, mode) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + mode) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + mode) % 26) + 97);
      }
    }
    result += char;
  }
  return result;
}

// Hàm hoán vị dựa trên substitutionPairs
function permutation(text) {
  let permutedText = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (substitutionPairs[char]) {
      permutedText += substitutionPairs[char];
    } else {
      permutedText += char;
    }
  }
  return permutedText;
}

// Hàm giải hoán vị dựa trên substitutionPairs
function reversePermutation(text) {
  let reversePermutedText = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    for (let key in substitutionPairs) {
      if (substitutionPairs[key] === char) {
        reversePermutedText += key;
        break;
      }
    }
  }
  return reversePermutedText;
}

// Hàm giải mã dịch vòng
function reverseCaesarShift(text, mode) {
  return caesarShift(text, (26 - mode) % 26);
}

// Hàm mã hóa và giải mã
function encryptText(text, caesarMode, permutationKey) {
  console.log('Plaintext:', text);

  // Mã hóa dịch vòng
  let caesarCipher = caesarShift(text, caesarMode);
  console.log('After Caesar Cipher:', caesarCipher);

  // Giải mã dịch vòng
  let reverseCaesarCipher = reverseCaesarShift(caesarCipher, caesarMode);
  console.log('After Reverse Caesar Cipher:', reverseCaesarCipher);

  // Mã hóa hoán vị
  let permutedText = permutation(reverseCaesarCipher);
  console.log('After Permutation:', permutedText);

  // Giải mã hoán vị
  let reversePermutedText = reversePermutation(permutedText);
  console.log('After Reverse Permutation:', reversePermutedText);

  // // Giải mã dịch vòng để trả về giá trị ban đầu
  // let decryptedText = decrypt(reversePermutedText);
  // console.log('Decrypted Text:', decryptedText);

  // return decryptedText;
}

// Văn bản gốc
let plaintext = 'HELLOWORLD';
const key = 10;
const mod = 25;
// Thực hiện mã hóa và giải mã
let decryptedText = encryptText(plaintext, key, mod);
