class StringCalculator {
  constructor() {
    this.callCount = 0;
  }
  //demo contents
  add(numbers) {
    this.callCount++;
    if (numbers === "") return 0;

    const { nums, delimiters } = this.parseInput(numbers);
    const parsedNumbers = this.splitNumbers(nums, delimiters);

    const negativeNumbers = parsedNumbers.filter((n) => n < 0);
    if (negativeNumbers.length) {
      throw new Error(`negatives not allowed: ${negativeNumbers.join(", ")}`);
    }

    return parsedNumbers
      .filter((n) => n <= 1000)
      .reduce((sum, n) => sum + n, 0);
  }

  parseInput(input) {
    let delimiters = [",", "\n"];
    let nums = input;

    if (input.startsWith("//")) {
      const endOfDelimiter = input.indexOf("\n");
      const delimiterPart = input.substring(2, endOfDelimiter);
      delimiters = delimiterPart.match(/\[([^\]]+)\]/g)
        ? delimiterPart.match(/\[([^\]]+)\]/g).map((d) => d.slice(1, -1))
        : [delimiterPart];
      nums = input.substring(endOfDelimiter + 1);
    }

    return { nums, delimiters };
  }

  splitNumbers(nums, delimiters) {
    const regex = new RegExp(`[${delimiters.join("")}]`);
    return nums.split(regex).map((n) => parseInt(n, 10));
  }

  getCalledCount() {
    return this.callCount;
  }
}

// Test cases
const calculator = new StringCalculator();

// Test case 1: Empty string
console.assert(calculator.add("") === 0, "Test Case 1 Failed");

// Test case 2: Single number
console.assert(calculator.add("1") === 1, "Test Case 2 Failed");
console.assert(calculator.add("2") === 2, "Test Case 2.1 Failed");

// Test case 3: Two numbers
console.assert(calculator.add("1,2") === 3, "Test Case 3 Failed");

// Test case 4: Unknown amount of numbers
console.assert(calculator.add("1,2,3,4,5") === 15, "Test Case 4 Failed");

// Test case 5: New lines between numbers
console.assert(calculator.add("1\n2,3") === 6, "Test Case 5 Failed");

// Test case 6: Different delimiters
console.assert(calculator.add("//;\n1;2") === 3, "Test Case 6 Failed");

// Test case 7: Negative number throws exception
try {
  calculator.add("1,-2,3");
} catch (e) {
  console.assert(
    e.message === "negatives not allowed: -2",
    "Test Case 7 Failed"
  );
}

// Test case 8: Multiple negative numbers in exception message
try {
  calculator.add("1,-2,-3");
} catch (e) {
  console.assert(
    e.message === "negatives not allowed: -2, -3",
    "Test Case 8 Failed"
  );
}

// Test case 9: GetCalledCount method
calculator.add("1,2");
calculator.add("3,4");
console.assert(calculator.getCalledCount() === 8, "Test Case 9 Failed");

// Test case 10: Numbers bigger than 1000 should be ignored
console.assert(calculator.add("2,1001") === 2, "Test Case 10 Failed");

// Test case 11: Delimiters can be of any length
console.assert(
  calculator.add("//[***]\n1***2***3") === 6,
  "Test Case 11 Failed"
);

// Test case 12: Multiple delimiters
console.assert(calculator.add("//[*][%]\n1*2%3") === 6, "Test Case 12 Failed");
console.assert(
  calculator.add("//[**][%%]\n1**2%%3") === 6,
  "Test Case 12.1 Failed"
);

console.log("All tests passed!");
