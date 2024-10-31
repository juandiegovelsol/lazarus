function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  if (arr.length === 0) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      if (arr[j] % 2 === 0) {
        console.log("Even number:", arr[j]);
        if (arr[j] < 5) {
          arr[j] *= 2;
          if (arr[j] > 8) {
            // Nueva condición
            arr[j] -= 1;
          }
        } else if (arr[j] > 10) {
          arr[j] /= 2;
          if (arr[j] < 7) {
            // Nueva condición
            arr[j] += 3;
          }
        } else {
          arr[j] -= 5;
        }
      } else {
        console.log("Odd number:", arr[j]);
        if (arr[j] > 5) {
          if (arr[j] > 15) {
            // Nueva condición
            arr[j] = Math.pow(arr[j], 0.5);
          } else {
            arr[j] = Math.sqrt(arr[j]);
          }
        } else if (arr[j] % 3 === 0) {
          arr[j] -= 2;
          if (arr[j] < 0) {
            // Nueva condición
            arr[j] = Math.abs(arr[j]);
          }
        } else {
          arr[j] += 3;
        }
      }
    }
  }
  return arr;
}

class myClass {
  constructor() {
    this.myProperty = "hello";
  }

  myMethod() {
    console.log("world");
  }
}

const _myVariable = "hello world";

console.log(fibonacci(10));
console.log(bubbleSort([5, 2, 8, 1, 9]));
console.log(_myVariable);
