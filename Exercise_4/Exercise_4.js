/**
 * Coding exercise #4 for Availity's Fullstack Homework Assignment
 * @author Steven Lee / stevenmlee99@gmail.com
 */

/**
 * @name isBalanced
 * @description Given a string of parentheses, returns true if all parentheses are closed and nested; otherwise, returns false.
 * @param {string} str
 * @returns {bool}
 */
function isBalanced(str) {
  // Define a stack, which we will use to push '(' into.
  var stack = [];

  for (let index = 0; index < str.length; index++) {
    let char = str[index];

    if (char == '(') {
      stack.push(char);
    } else if (char == ')') {
      if (stack.length > 0) {
        // We have formed a pair of parentheses, remove the '(' from the stack.
        stack.pop();
      } else {
        // We have encountered a ')', but no '(' to pair with it, therefore we are not balanced.
        return false;
      }
    }
  }

  // Make sure we have nothing left over from the string.
  if (stack.length > 0) {
    return false;
  }

  return true;
}

/**
 * @name testIsBalanced
 * @description Function used to test 'isBalanced' given input strings and desired results.
 * @param {array} strings
 * @param {array} results
 */
function testIsBalanced(strings, results) {
  // strings[i] should return results[i] if the function is working properly.
  for (let i = 0; i < strings.length; i++) {
    let testString = strings[i];
    let expectedResult = results[i];
    let result = isBalanced(testString);

    // Validate result.
    if (result != expectedResult) {
      console.warn('Test case ' + i + ' failed.');
    } else {
      console.log('Test case ' + i + ' passed.');
    }
  }
}

// Test cases.
var testStrings = [
  // True cases.
  '()',
  '((()))',
  '()(())((()))',
  '(5 + 3) * (2 / (3 * 3)) / (3 - (5 + (10 * 10)))',

  // False cases.
  '(()',
  ')()(',
  '))((',
  '()())',
];

// Expected test results.
var expectedResults = [true, true, true, true, false, false, false, false];

testIsBalanced(testStrings, expectedResults);
