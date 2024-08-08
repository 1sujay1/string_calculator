class StringCalculator {
  constructor() {
    this.callCount = 0;
  }

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
  // console.log("Hello world")
  splitNumbers(nums, delimiters) {
    const regex = new RegExp(`[${delimiters.join("")}]`);
    return nums.split(regex).map((n) => parseInt(n, 10));
  }

  getCalledCount() {
    return this.callCount;
  }
}
const calculator = new StringCalculator();

try {
  console.assert(calculator.add("") === 0, "Test Case 1 Failed");
  console.assert(calculator.add("1") === 1, "Test Case 2 Failed");
  console.assert(calculator.add("2") === 2, "Test Case 2.1 Failed");
  console.assert(calculator.add("1,2") === 3, "Test Case 3 Failed");
  console.assert(calculator.add("1,2,3,4,5") === 15, "Test Case 4 Failed");
  console.assert(calculator.add("1\n2,3") === 6, "Test Case 5 Failed");
  console.assert(calculator.add("//;\n1;2") === 3, "Test Case 6 Failed");

  try {
    calculator.add("1,-2,3");
  } catch (e) {
    console.assert(
      e.message === "negatives not allowed: -2",
      "Test Case 7 Failed"
    );
  }

  try {
    calculator.add("1,-2,-3");
  } catch (e) {
    console.assert(
      e.message === "negatives not allowed: -2, -3",
      "Test Case 8 Failed"
    );
  }

  calculator.add("1,2");
  calculator.add("3,4");
  console.assert(calculator.getCalledCount() === 8, "Test Case 9 Failed");
  console.assert(calculator.add("2,1001") === 2, "Test Case 10 Failed");
  console.assert(
    calculator.add("//[***]\n1***2***3") === 6,
    "Test Case 11 Failed"
  );
  console.assert(
    calculator.add("//[*][%]\n1*2%3") === 6,
    "Test Case 12 Failed"
  );
  console.assert(
    calculator.add("//[**][%%]\n1**2%%3") === 6,
    "Test Case 12.1 Failed"
  );

  console.log("All tests passed!");
} catch (error) {
  console.error(error.message);
}
