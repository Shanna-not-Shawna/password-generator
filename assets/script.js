
var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var special = ["?", "!", "@", "#", "$", "%", "&", "*"]
var numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

var passwordLength = 0;
var useSpecial = false;
var useNumbers = false;
var useUpper = false;
var useLower = false;

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var validCriteria = promptUser();

  // if invalid input from user
  if (!validCriteria) {
    return "Please Try Again!"

  }

  var selectedCharacters = [];
  var password = "";

  if (useLower) {
    //add chars to selected
    selectedCharacters.push(...lower);

    //make sure password has at least one of this character type
    password += getRandomCharacter(lower)
  }

  if (useUpper) {
    //add chars to selected
    selectedCharacters.push(...upper);

    //make sure password has at least one of this character type
    password += getRandomCharacter(upper)
  }

  if (useSpecial) {
    //add chars to selected
    selectedCharacters.push(...special);

    //make sure password has at least one of this character type
    password += getRandomCharacter(special)
  }

  if (useNumbers) {
    //add chars to selected
    selectedCharacters.push(...numArr);

    //make sure password has at least one of this character type
    password += getRandomCharacter(numArr)
  }

  while (password.length < passwordLength) {
    //add another character until length is reached
    password += getRandomCharacter(selectedCharacters)
  }

  // acceptance criteria
  return password
}



// Math.floor(Math.random) to generate random character
function getRandomCharacter(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// loop generates 1 character at a time and stops when the number of characters entered is reached

function promptUser() {
  passwordLength = window.prompt("How many characters do you want your password to be?");

  // check for empty string
  if (!passwordLength) {
    window.alert("Please enter a valid number!");
    return false;
  }

  // check for numerical input
  if (isNaN(passwordLength)) {
    window.alert("Please enter a valid Number!");
    return false;
  }

  // change string to number
  passwordLength = parseInt(passwordLength);

  // check if number is within range
  if (passwordLength < 8 || passwordLength > 128) {
    window.alert("Please enter a number between 8 and 128.");
    return false;
  }

  // if true, push array contents into selectedCharacters
  useSpecial = window.confirm("Would you like special characters included?");

  // if true, push array contents into selectedCharacters
  useNumbers = window.confirm("Would you like numbers included?");

  // if true, push array contents into selectedCharacters
  useUpper = window.confirm("Would you like uppercase letters included?");

  // if true, push array contents into selectedCharacters
  useLower = window.confirm("would you like lowercase letters included?");

  if (!useSpecial && !useNumbers && !useUpper && !useLower) {
    window.alert("Please select at least one character type");
    return false;
  }

  return true;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);