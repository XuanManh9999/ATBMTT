// Hàm mã hóa chuỗi
var rule = [
  { A: 0 },
  { B: 1 },
  { C: 2 },
  { D: 3 },
  { E: 4 },
  { F: 5 },
  { G: 6 },
  { H: 7 },
  { I: 8 },
  { J: 9 },
  { K: 10 },
  { L: 11 },
  { M: 12 },
  { N: 13 },
  { O: 14 },
  { P: 15 },
  { Q: 16 },
  { R: 17 },
  { S: 18 },
  { T: 19 },
  { U: 20 },
  { V: 21 },
  { W: 22 },
  { X: 23 },
  { Y: 24 },
  { Z: 25 },
];

function encodeString(inputString, key) {
  let encodedString = "";

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i].toUpperCase(); // Chuyển thành chữ hoa để phù hợp với quy tắc
    let charValue;

    // Nếu ký tự là chữ cái, lấy giá trị từ rule, ngược lại giữ nguyên giá trị ký tự
    if (/^[A-Z]$/.test(char)) {
      charValue = rule.find((item) => item[char] !== undefined)[char];
    } else {
      charValue = parseInt(char); // Giữ nguyên giá trị số
    }

    // Lấy giá trị của ký tự trong khóa
    const keyValue =
      typeof key === "string"
        ? rule.find((item) => item[key] !== undefined)[key]
        : key;

    // Tính giá trị đã mã hóa
    const encodedValue = (charValue + keyValue) % 26;

    // Tìm ký tự tương ứng với giá trị đã mã hóa và thêm vào chuỗi mã hóa
    const encodedChar = Object.keys(rule[encodedValue])[0];
    encodedString += encodedChar;
  }

  return encodedString;
}

// Hàm giải mã chuỗi
function decodeString(encodedString, key) {
  let decodedString = "";

  for (let i = 0; i < encodedString.length; i++) {
    const char = encodedString[i];
    let charValue = rule.find((item) => item[char] !== undefined)[char];

    // Lấy giá trị của ký tự trong khóa
    const keyValue =
      typeof key === "string"
        ? rule.find((item) => item[key] !== undefined)[key]
        : key;

    // Tính giá trị đã giải mã
    let decodedValue = charValue - keyValue;
    if (decodedValue < 0) {
      decodedValue += 26; // Đảm bảo giá trị âm sẽ quay lại từ Z -> A
    }

    // Tìm ký tự tương ứng với giá trị đã giải mã và thêm vào chuỗi giải mã
    const decodedChar = Object.keys(rule[decodedValue])[0];
    decodedString += decodedChar;
  }

  return decodedString;
}
// hendle key
function sumValuesFromString(str, rule) {
  let sum = 0;

  // Duyệt qua từng ký tự trong chuỗi khóa
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toUpperCase(); // Chuyển thành chữ hoa để phù hợp với quy tắc

    // Tìm giá trị tương ứng với ký tự từ mảng rule
    const value = rule.find((item) => item[char] !== undefined)[char];

    // Cộng giá trị vào tổng
    sum += value;
  }

  return sum % 26; // Trả về giá trị dùng làm khóa, đảm bảo nằm trong khoảng từ 0 đến 25
}

// hendle key
function repeatKeyToMatchLength(key, length) {
  const repeatedKey = key
    .repeat(Math.ceil(length / key.length))
    .slice(0, length);
  return repeatedKey.toUpperCase(); // Chuyển thành chữ hoa để phù hợp với quy tắc
}

const hendleKey = (key, length) => {
  if (typeof key === "number") {
    return key;
  } else {
    return repeatKeyToMatchLength(key, length);
  }
};

// Test mã hóa và giải mã
const inputString = "ABC";
const key = hendleKey(2);

const encoded = encodeString(inputString, hendleKey(key, inputString.length));
console.log("Chuỗi đã mã hóa:", encoded);

const decoded = decodeString(encoded, hendleKey(key, encoded.length));
console.log("Chuỗi đã giải mã:", decoded);
