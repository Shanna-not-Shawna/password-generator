var upperWords = ["Amazing", "Aqua", "Azure", "Beautiful", "Beige", "Black", "Blue", "Brown", "Burgundy", "Clever", "Coral", "Crimson", "Cyan", "Delightful", "Dazzling", "Elegant", "Energetic", "Fantastic", "Friendly", "Gorgeous", "Graceful", "Green", "Happy", "Incredible", "Indigo", "Intelligent", "Ivory", "Joyful", "Kind", "Lavender", "Lilac", "Lovely", "Lively", "Magnificent", "Magenta", "Maroon", "Noble", "Nice", "Optimistic", "Outstanding", "Peaceful", "Playful", "Quick", "Radiant", "Red", "Sincere", "Silver", "Talented", "Teal", "Tranquil", "Unique", "Understanding", "Valuable", "Vibrant", "White", "Wonderful", "Witty", "Youthful", "Zealous", "Yellow"]
var lowerWords = ["airplane", "appliance", "apple", "bed", "blanket", "book", "brush", "basement", "cabinet", "car", "chair", "city", "clock", "coffee", "computer", "cup", "curtain", "classroom", "desk", "door", "drawer", "dog", "dolphin", "elevator", "elephant", "faucet", "floor", "flower", "fork", "friend", "glass", "hat", "house", "key", "lamp", "lemon", "light", "lime", "mirror", "music", "ocean", "paper", "pen", "pear", "phone", "pineapple", "plate", "pot", "river", "rug", "school", "scissors", "shelf", "shirt", "shoe", "shoes", "sink", "soap", "sock", "spoon", "suitcase", "sun", "table", "telephone", "toothbrush", "train", "tree", "vase", "window"]
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
var isFirstClick = true;

var generateBtn = document.querySelector("#generate");
var resetBtn = document.querySelector("#resetBtn");
var container = document.querySelector("#card");

const getRandomCharacter = arr => {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const generatePassword = event => {
  console.log('Generating password...');
  if (event) {
    event.preventDefault();
  }

  const useExactLength = document.querySelector("#useExact").checked;
  const useWords = document.querySelector("#words").checked;
  const useSpecial = document.querySelector("#special").checked;
  const useNumbers = document.querySelector("#numbers").checked;
  const useUpper = document.querySelector("#upper").checked;
  const passwordLengthInput = document.querySelector("#length");
  const passwordLength = parseInt(passwordLengthInput.value, 10);

  const selectedCharacters = [];
  let password = ""; 

  const addCharacters = (arr) => {
    if (useWords) {
      while (password.length < passwordLength) {
        let randomWord = getRandomCharacter(arr);
  
        if (randomWord.length <= passwordLength - password.length) {
          console.log('Adding word to password:', randomWord);
          selectedCharacters.push(randomWord);
          password += randomWord;
        }
      }
    } else {
      while (password.length < passwordLength) {
        let randomChar = getRandomCharacter(arr);
  
        if (randomChar.length <= passwordLength - password.length) {
          console.log('Adding char to password:', randomChar);
          selectedCharacters.push(randomChar);
          password += randomChar;
        }
      }
    }
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

  console.log('Generated password', password);
  return password;
};

const writePassword = (event) => {
  console.log('Writing password...');
  if (event) {
    event.preventDefault();
  }

  const password = generatePassword();
  console.log('Generated password:', password);
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

  if (isFirstClick) {
    generateBtn.textContent = "Generate Another";
    resetBtn.style.display = "inline-block";
    isFirstClick = false;
  }
}

container.addEventListener("click", function (event) {
  console.log('Container click event triggered.');
  var target = event.target;

  if (target.id === "resetBtn") {
    event.preventDefault();
    resetForm();
  } else if (target.id === "generate") {
    event.preventDefault();
    writePassword(event);
  }
});

resetBtn.addEventListener("click", function (event) {
  console.log('Reset button click event triggered.');
  event.preventDefault();
  resetForm();
});

const resetForm = () => {
  const form = document.getElementById("generatePassForm");
  form.reset();

  document.querySelector("#words").checked = false;
  document.querySelector("#special").checked = false;
  document.querySelector("#numbers").checked = false;
  document.querySelector("#upper").checked = false;
  document.querySelector("#length").value = "";
  document.querySelector("#password").value = "";

  generateBtn.textContent = "Generate Password";
  resetBtn.style.display = "none";

  isFirstClick = true;
}

const copyText = () => {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  window.getSelection().removeAllRanges();
}

const generatePassForm = document.querySelector("#generatePassForm");
generatePassForm.addEventListener("submit", function (event) {
  console.log('Form submission event triggered.');
  writePassword(event);
});

// Future development:
// Option for standard password with words or characters only for more security
// Use a form instead of prompts to collect user data
// Button to generate another password with the same specifications
// Reconfigure function to use user's character length when words are selected
// Style copy to clipboard button
// Add password tips to page layout
// Style reset form