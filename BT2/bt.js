const fs = require('fs');

const rule = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

// Kiểm tra xem key có hợp lệ hay không
function isValidKey(key) {
  return typeof key === 'string' && key.length === 1 && /^[A-Z]$/.test(key);
}

// Hàm mã hóa chuỗi
function encodeString(inputString, key) {
  let encodedString = '';
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i].toUpperCase();
    let charValue;

    if (/^[A-Z]$/.test(char)) {
      charValue = rule[char];
    } else {
      charValue = parseInt(char);
    }

    // Kiểm tra key có hợp lệ hay không
    if (!isValidKey(key)) {
      console.error('Key không hợp lệ.');
      return;
    }

    const keyValue = rule[key];
    const encodedValue = (charValue + keyValue) % 26;
    encodedString += Object.keys(rule).find(
      (key) => rule[key] === encodedValue
    );
  }
  return encodedString;
}

// Hàm giải mã chuỗi
function decodeString(encodedString, key) {
  let decodedString = '';
  for (let i = 0; i < encodedString.length; i++) {
    const char = encodedString[i];
    let charValue = rule[char];
    const keyValue = rule[key];
    let decodedValue = charValue - keyValue;
    if (decodedValue < 0) {
      decodedValue += 26;
    }
    decodedString += Object.keys(rule).find((k) => rule[k] === decodedValue);
  }
  return decodedString;
}

// Đọc nội dung từ tập tin và loại bỏ các khoảng trắng và dấu xuống dòng
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8').trim(); // Sử dụng hàm trim() để loại bỏ khoảng trắng ở đầu và cuối chuỗi
  } catch (error) {
    console.error('Đã xảy ra lỗi khi đọc tập tin:', error.message);
    return null;
  }
}

// Mã hóa và in ra màn hình
function encodeAndPrint(inputFilePath, key) {
  const inputString = readFile(inputFilePath);
  if (!inputString) return;
  const encodedString = encodeString(inputString, key);
  console.log('Chuỗi đã mã hóa:', encodedString);
}

// Giải mã và in ra màn hình
function decodeAndPrint(encodedFilePath, key) {
  const encodedString = readFile(encodedFilePath);
  if (!encodedString) return;
  const decodedString = decodeString(encodedString, key);
  console.log('Chuỗi đã giải mã:', decodedString);
}

// Đường dẫn của tập tin input và output
const inputFilePath = 'input.txt';
const encodedFilePath = 'encoded.txt';

// Đọc key từ tập tin
const keyFilePath = 'key.txt';
const key = readFile(keyFilePath);

// Mã hóa và in ra màn hình
encodeAndPrint(inputFilePath, key);

// Giải mã và in ra màn hình
decodeAndPrint(encodedFilePath, key);
