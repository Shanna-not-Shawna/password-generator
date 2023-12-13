
var upper = ["Aqua", "Azure", "Beige", "Black", "Blue", "Brown", "Burgundy", "Coral", "Crimson", "Cyan", "Emerald", "Fuchsia", "Gold", "Green", "Indigo", "Ivory", "Lavender", "Lilac", "Magenta", "Maroon", "Navy", "Olive", "Orange", "Pink", "Purple", "Red", "Silver", "Teal", "Violet", "White", "Yellow", "Amazing", "Beautiful", "Clever", "Delightful", "Elegant", "Fantastic", "Gorgeous", "Happy", "Incredible", "Joyful", "Kind", "Lovely", "Nice", "Outstanding", "Peaceful", "Quiet", "Radiant", "Serene", "Tranquil", "Unique", "Valuable", "Wonderful"]
var lower = ["appliance", "bed", "blanket", "book", "brush", "cabinet", "chair", "clock", "computer", "cup", "curtain", "desk", "door", "drawer", "faucet", "floor", "fork", "glass", "hanger", "hat", "key", "knife", "lamp", "light", "mirror", "mop", "nail", "needle", "paper", "pen", "pillow", "plate", "pot", "rug", "scissors", "shelf", "shirt", "shoe", "sink", "soap", "sock", "spoon", "stove", "table", "towel", "vase", "wall", "window"]
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
  useLower = window.confirm("Would you like lowercase letters included?");

  if (!useSpecial && !useNumbers && !useUpper && !useLower) {
    window.alert("Please select at least one character type");
    return false;
  }

  return true;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);