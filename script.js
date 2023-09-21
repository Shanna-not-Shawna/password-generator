// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var special = ["?", "!", "@", "#", "$", "%", "&", "*"]
var numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]


// input fields have .value on click 
// need an event listener click event
// make generatePassword function


function generatePassword() {
  // acceptance criteria
  return "mySecretPassword"
}



// Math.floor(Math.random) to generate random character

password += Math.floor(Math.random() * upper.length)
password += Math.floor(Math.random() * lower.length)
password += Math.floor(Math.random() * special.length)
password += Math.floor(Math.random() * numArr.length)

// loop generates 1 character at a time and stops when the number of characters entered is reached

// add condition to be between 8 and 129 characters
window.prompt("How many characters do you want your password to be?");

// if true, include special in Math.random calculation
window.confirm("Would you like special characters included?");

// if true, include numbers in Math.random calculation
window.confirm("Would you like numbers included?");

// if true, upper numbers in Math.random calculation
window.confirm("Would you like upppercase letters included?");

// if true, include lower in Math.random calculation
window.confirm("would you like lowercase letters included?");


