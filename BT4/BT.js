const appATBMTT = {
  timpiEuler: (n, arr = [], check = false) => {
    function snt(n) {
      if (n < 2 || n % 1 != 0) {
        return false;
      }
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
          return false;
        }
      }
      return true;
    }
    for (let i = 2; i <= n; i++) {
      if (snt(i)) {
        arr.push(i);
      }
    }

    for (let j = 0; j < arr.length; j++) {
      for (let k = j; k < arr.length; k++) {
        if (arr[j] * arr[k] === n) {
          console.log(`phân tích ta được n = ${arr[j]} * ${arr[k]}`);
          console.log(
            `Kết quả của (${arr[j]} - 1) * (${arr[k]} - 1) = `,
            (arr[j] - 1) * (arr[k] - 1)
          );
          check = true;
          break;
        }
      }
      if (j === arr.length - 1) {
        if (snt(n)) {
          console.log(`${n} - 1 = `, n - 1);
        } else if (check === false) {
          console.log('Không có số nào thỏa mãn điều kiện đề bài');
        }
      }
    }
  },
  timGCD: (a, b) => {
    let i = 0;
    while (b !== 0) {
      i++;
      let r = a % b;
      a = b;
      b = r;
      console.log(`Lần ${i}: (${a} % ${b})`);
      if (b === 0) {
        console.log(`Ước chung lớn nhất của là ${a}`);
      }
    }
  },
  timX: (c, a, n) => {
    let check = false;
    for (let i = 0; i < n; i++) {
      if (Math.pow(c, i) % n === a) {
        console.log('Vì c^i mod n = a nên X = ' + i);
        check = true;
        break;
      }
    }
    if (!check) {
      console.log('Không tồn tại giá trị hợp lệ');
    }
  },
  timANghichDao: (a, m) => {
    function hendleMod(a, b) {
      if (b === 0) {
        return [1, 0, a];
      } else {
        const [x, y, gcd] = hendleMod(b, a % b);
        return [y, x - Math.floor(a / b) * y, gcd];
      }
    }

    const [x, y, gcd] = hendleMod(a, m);
    if (gcd !== 1) {
      console.log('Không có nghịch đảo modulo');
    } else {
      console.log(
        `Nghịch đảo của', ${a}^-1 mod ${m}, là: ${((x % m) + m) % m} mod ${m}`
      );
    }
  },
};

// Sử dụng hàm:
const inverse = appATBMTT.timANghichDao(17, 199);
