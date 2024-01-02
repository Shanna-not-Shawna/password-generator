var upperWords = ["Aqua", "Azure", "Beige", "Black", "Blue", "Brown", "Burgundy", "Coral", "Crimson", "Cyan", "Emerald", "Fuchsia", "Gold", "Green", "Indigo", "Ivory", "Lavender", "Lilac", "Magenta", "Maroon", "Navy", "Olive", "Orange", "Pink", "Purple", "Red", "Silver", "Teal", "Violet", "White", "Yellow", "Amazing", "Beautiful", "Clever", "Delightful", "Elegant", "Fantastic", "Gorgeous", "Happy", "Incredible", "Joyful", "Kind", "Lovely", "Nice", "Outstanding", "Peaceful", "Quiet", "Radiant", "Serene", "Tranquil", "Unique", "Valuable", "Wonderful"]
var lowerWords = ["appliance", "apple", "pineapple", "bed", "blanket", "book", "brush", "cabinet", "chair", "clock", "computer", "cup", "curtain", "desk", "door", "drawer", "faucet", "floor", "fork", "glass", "hanger", "hat", "key", "knife", "lamp", "light", "mirror", "mop", "nail", "needle", "paper", "pen", "pillow", "plate", "pot", "rug", "scissors", "shelf", "shirt", "shoe", "sink", "soap", "sock", "spoon", "stove", "table", "towel", "vase", "wall", "window"]
var special = ["?", "!", "@", "#", "$", "%", "&", "*"]
var numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

var passwordLength = 0;
var useWords = false;
var useSpecial = false;
var useNumbers = false;
var useUpper = false;
var useLower = false;

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
const writePassword = () => {
  if (event) {
    event.preventDefault();
  }

  const password = generatePassword();
  const passwordText = document.querySelector("#password");
  const isFirstClick = true;

  passwordText.value = password;

  if (isFirstClick) {
    generateBtn.textContent = "Generate Again";
    isFirstClick = false;
  }
}

const generatePassword = event => {
  if (event) {
    event.preventDefault();
  }
  var passwordLength = document.querySelector("#length").value;
  var useWords = document.querySelector("#words").checked;
  var useSpecial = document.querySelector("#special").checked;
  var useNumbers = document.querySelector("#numbers").checked;
  var useUpper = document.querySelector("#upper").checked;
  var useLower = true;
  var selectedCharacters = [];
  var password = ""; 

  if (useUpper && useWords) {
    // add chars to selected
    selectedCharacters.push(...upperWords);

    // make sure password has at least one of this character type
    password += getRandomCharacter(upperWords);
  } else if (useWords) {
    // add chars to selected
    selectedCharacters.push(...lowerWords);

    // make sure password has at least one of this character type
    password += getRandomCharacter(lowerWords);
  }

  if (useLower && !useWords) {
    // add chars to selected
    selectedCharacters.push(...lower);

    // make sure password has at least one of this character type
    password += getRandomCharacter(lower);
  }

  if (!useWords && useUpper) {
    selectedCharacters.push(...upper);

    password += getRandomCharacter(upper);
  }

  if (useSpecial) {
    // add chars to selected
    selectedCharacters.push(...special);

    // make sure password has at least one of this character type
    password += getRandomCharacter(special);
  }

  if (useNumbers) {
    // add chars to selected
    selectedCharacters.push(...numArr);

    // make sure password has at least one of this character type
    password += getRandomCharacter(numArr);
  }

  while (password.length < passwordLength) {
    // add another character until length is reached
    password += getRandomCharacter(selectedCharacters);
  }

  return password;
}

const copyText = () => {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  window.getSelection().removeAllRanges();
}

// Math.floor(Math.random) to generate random character
const getRandomCharacter = arr => {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const resetForm = () => {
  const form = document.getElementById("generatePassForm");
  form.reset();
  isFirstClick = true;
}

// Add event listener to generate button
const generatePassForm = document.querySelector("#generatePassForm");
generatePassForm.addEventListener("submit", function (event) {
  writePassword(event)});

// Future development:
// Option for standard password with words or characters only for more security
// Use a form instead of prompts to collect user data
// Button to generate another password with the same specifications
// Reconfigure function to use user's character length when words are selected
// Style copy to clipboard button
// Add password tips to page layout