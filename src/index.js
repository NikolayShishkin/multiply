module.exports = function multiply(first, second) {
  let longNumber, shortNumber;
  if (first.length >= second.length) {
    longNumber = first;
    shortNumber = second;
  } else {
    longNumber = second;
    shortNumber = first;
  }
  const shortNumberDigits = shortNumber.split('').reverse();
  const resultArr = [];

  //multiply big number and single digit
  const multiplyNumberBySingleDigit = function(str, digit) {
    const result = [];
    let surplus = 0;
    let temp = 0;
    let arr = str
      .split('')
      .reverse()
      .map(x => +x);
    for (let i = 0; i < arr.length; i += 1) {
      temp = arr[i] * digit + surplus;
      surplus = Math.floor(temp / 10);
      result.push(temp % 10);
    }
    if (surplus > 0) {
      result.push(surplus);
    }
    return result.reverse().join('');
  };

  //add two big numbers
  const add = function (str1, str2) { 
    if (str2.length > str1.length) {
      let swap;
      swap = str2;
      str2 = str1;
      str1 = swap;
    }
    const arr1 = str1
      .split('')
      .reverse()
      .map(x => +x);
    const arr2 = str2
      .split('')
      .reverse()
      .map(x => +x);
    const sumArr = [];
    let surplus = 0;
    let temp = 0;
    for (let i = 0; i < str1.length; i += 1) {
      arr2[i] = arr2[i] ? arr2[i] : 0;
      temp = arr1[i] + arr2[i] + surplus;
      surplus = Math.floor(temp / 10);
      sumArr.push(temp % 10);
    }
    if (surplus > 0) {
      sumArr.push(surplus);
    }
    return sumArr.reverse().join('');
  }

  //pad resulting array with zeroes
  for (let i = 0; i < shortNumber.length; i += 1) {
    resultArr[i] = '0'.repeat(i);
  }
  shortNumberDigits.forEach(function(item, index) {
    resultArr[index] =
      multiplyNumberBySingleDigit(longNumber, +item) + resultArr[index];
  });

  let sum = '0';
  for (let i = resultArr.length - 1; i >= 0; i -= 1) {
    sum = add(resultArr[i], sum);
  }
  return sum;
};
