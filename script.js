
var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var special = ["?", "!", "@", "#", "$", "%", "&", "*"]
var numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

var passwordLength = 0;
var useSpecial = false;
var useNumbers = false;
var useUpper = false;
var useLower = false;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}




// input fields have .value on click 
// need an event listener click event
// make generatePassword function


function generatePassword() {
  var validCriteria = promptUser();

  if (!validCriteria) {
    return "Please Try Again!"
  }

  var selectedCharacters = [];
  var password = "";

  if(useLower){
    //add chars to selected
    selectedCharacters.push(...lower);

    //make sure password has at least one of this character
    password += getRandomCharacter(lower)
  }


  

  while(password.length < passwordLength){
    //add another character
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

function promptUser() {// add condition to be between 8 and 129 characters
  passwordLength = window.prompt("How many characters do you want your password to be?");

  if (isNaN(passwordLength)) {
    window.alert("Please enter a valid Number!");
    return false;
  }

  passwordLength = parseInt(passwordLength);

  if (passwordLength < 8 || passwordLength > 128) {
    window.alert("Please enter a number between 8 and 128.");
    return false;
  }

  // if true, include special in Math.random calculation
  useSpecial = window.confirm("Would you like special characters included?");

  // if true, include numbers in Math.random calculation
  useNumbers = window.confirm("Would you like numbers included?");

  // if true, upper numbers in Math.random calculation
  useUpper = window.confirm("Would you like uppercase letters included?");

  // if true, include lower in Math.random calculation
  useLower = window.confirm("would you like lowercase letters included?");

  if (!useSpecial && !useNumbers && !useUpper && !useLower) {
    window.alert("Please select at least one character type");
    return false;
  }

  return true;

}

// ***if all are false, need an alert saying you must pick one



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);