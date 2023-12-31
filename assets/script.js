var upperWords = ["Amazing", "Aqua", "Azure", "Beautiful", "Beige", "Black", "Blue", "Brown", "Burgundy", "Clever", "Coral", "Crimson", "Cyan", "Delightful", "Dazzling", "Elegant", "Energetic", "Fantastic", "Friendly", "Gorgeous", "Graceful", "Green", "Happy", "Incredible", "Indigo", "Intelligent", "Ivory", "Joyful", "Kind", "Lavender", "Lilac", "Lovely", "Lively", "Magnificent", "Magenta", "Maroon", "Noble", "Nice", "Noble", "Optimistic", "Outstanding", "Peaceful", "Playful", "Quick", "Radiant", "Red", "Sincere", "Silver", "Talented", "Teal", "Tranquil", "Unique", "Understanding", "Valuable", "Vibrant", "White", "Wonderful", "Witty", "Youthful", "Zealous", "Yellow"]
var lowerWords = ["airplane", "appliance", "apple", "bed", "blanket", "book", "brush", "cabinet", "car", "chair", "city", "clock", "coffee", "computer", "cup", "curtain", "desk", "door", "drawer", "dog", "elevator", "faucet", "floor", "flower", "fork", "friend", "glass", "hat", "house", "key", "lamp", "lemon", "light", "lime", "mirror", "music", "ocean", "paper", "pen", "pear", "phone", "pineapple", "plate", "pot", "river", "rug", "shoe", "shoes", "school", "scissors", "shelf", "shirt", "sink", "soap", "sock", "spoon", "sun", "table", "train", "tree", "vase", "window"]
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

  const passwordLength = document.querySelector("#length").value;
  const useWords = document.querySelector("#words").checked;
  const useSpecial = document.querySelector("#special").checked;
  const useNumbers = document.querySelector("#numbers").checked;
  const useUpper = document.querySelector("#upper").checked;

  const selectedCharacters = [];
  let password = ""; 

  const addCharacters = (arr) => {
    selectedCharacters.push(...arr);
    password += getRandomCharacter(arr);
  };

  if (useUpper && useWords) {
     addCharacters(upperWords);
  } else if (useWords) {
    addCharacters(lowerWords);
  } else {
    addCharacters(lower);
    if (useUpper) {
      addCharacters(upper);
    }
  }

  if (useSpecial) addCharacters(special);
  if (useNumbers) addCharacters(numArr);

  while (password.length < passwordLength) {
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

const getRandomCharacter = arr => {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const resetForm = () => {
  const form = document.getElementById("generatePassForm");
  form.reset();
  isFirstClick = true;
}

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