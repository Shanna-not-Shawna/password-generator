var upperWords = ["Adventurous", "Amazing", "Aqua", "Azure", "Beautiful", "Beige", "Black", "Blue", "Blissful", "Brown", "Bougie", "Burgundy", "Charming", "Clever", "Coral", "Crimson", "Cyan", "Daring", "Delightful", "Dazzling", "Elegant", "Energetic", "Ethereal", "Fantastic", "Fascinating", "Friendly", "Gorgeous", "Graceful", "Green", "Harmonious", "Happy", "Incredible", "Indigo", "Intelligent", "Inventive", "Ivory", "Jubilant", "Joyful", "Kind", "Kinetic", "Lavender", "Lilac", "Lovely", "Lively", "Magnificent", "Magenta", "Maroon", "Noble", "Nice", "Optimistic", "Outstanding", "Peaceful", "Playful", "Quick", "Radiant", "Red", "Silver", "Sincere", "Talented", "Teal", "Tranquil", "Unique", "Understanding", "Valuable", "Vibrant", "White", "Wonderful", "Witty", "Youthful", "Yellow", "Zealous"]
var lowerWords = ["air", "airplane", "appliance", "apple", "at", "ax", "basement", "bathtub", "bed", "book", "brush", "cabinet", "car", "chair", "city", "classroom", "clock", "coffee", "computer", "cup", "curtain", "desk", "dog", "dolphin", "door", "drawer", "do", "earthquake", "elevator", "elephant", "faucet", "family", "five", "floor", "flower", "fork", "food", "four", "friend", "glass", "go", "hat", "heart", "house", "if", "in", "is", "it", "key", "lamp", "lemon", "light", "lime", "me", "mirror", "movie", "music", "my", "no", "ocean", "ok", "one", "paper", "pen", "pear", "phone", "pineapple", "plate", "pot", "river", "rug", "school", "scissors", "shelf", "shirt", "shoe", "sink", "soap", "sock", "six", "spoon", "suitcase", "sun", "table", "telephone", "three", "time", "to", "toothbrush", "train", "tree", "two", "up", "us", "vase", "window"]
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

const wordsCheckbox = document.querySelector("#words");
const upperCheckbox = document.querySelector("#upper");
const specialCheckbox = document.querySelector("#special");
const numbersCheckbox = document.querySelector("#numbers");

wordsCheckbox.addEventListener("change", () => {
  console.log(`'Use Words' checkbox checked: ${wordsCheckbox.checked}`);
});

upperCheckbox.addEventListener("change", () => {
  console.log(`'Use Upper' checkbox checked: ${upperCheckbox.checked}`);
});

specialCheckbox.addEventListener("change", () => {
  console.log(`'Use Special' checkbox checked: ${specialCheckbox.checked}`);
});

numbersCheckbox.addEventListener("change", () => {
  console.log(`'Use Numbers' checkbox checked: ${numbersCheckbox.checked}`);
});

const getRandomCharacter = arr => {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const generatePassword = event => {
  console.log('Generating password...');
  if (event) {
    event.preventDefault();
  }

  // const useExactLength = document.querySelector("#useExact").checked;
  const useWords = document.querySelector("#words").checked;
  const useSpecial = document.querySelector("#special").checked;
  const useNumbers = document.querySelector("#numbers").checked;
  const useUpper = document.querySelector("#upper").checked;
  const passwordLengthInput = document.querySelector("#length");
  const passwordLength = parseInt(passwordLengthInput.value, 10);

  const selectedCharacters = [];
  let password = "";

  const getRandomCharacter = arr => {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const addCharacters = (arr, isWord) => {
    if (!useWords || (useWords && isWord)) {
      while (password.length < passwordLength && arr.length > 0) {
        console.log(`Entering loop. Current password:`, password);
        let randomChar = getRandomCharacter(arr);
  
        console.log(`randomChar.length:`, randomChar.length);
        console.log(`password.length:`, password.length);
        console.log('passwordLength', passwordLength);
  
        if (randomChar.length + password.length <= passwordLength) {
          console.log(`Adding ${isWord ? 'word' : 'char'} to password:`, randomChar);
          selectedCharacters.push(randomChar);
          password += randomChar;
        }
      }
    } else {
      console.log(`Skipping character. Exceeds password length.`);
      const charSets = [];
  
      if (useUpper && arr === upper) charSets.push(upper);
      if (useLower && arr === lower) charSets.push(lower);
      if (useNumbers && arr === numArr) charSets.push(numArr);
      if (useSpecial && arr === special) charSets.push(special);
  
      while (password.length < passwordLength && charSets.length > 0) {
        const randomSetIndex = Math.floor(Math.random() * charSets.length);
        const randomSet = charSets[randomSetIndex];
        let randomChar = getRandomCharacter(randomSet);
  
        if (randomChar.length + password.length <= passwordLength) {
          console.log(`Adding char to password:`, randomChar);
          selectedCharacters.push(randomChar);
          password += randomChar;
        } else {
          charSets.splice(randomSetIndex, 1);
        }
      }
    }
  }
  
  if (useWords && useUpper) {
    addCharacters(lowerWords, true);
    addCharacters(upperWords, true);
  } else if (!useWords && useUpper) {
    addCharacters(lower);
    addCharacters(upper);
  } else if (useWords) {
    addCharacters(lowerWords, true);
  } else {
    addCharacters(lower);
  }

  if (useSpecial) addCharacters(special, false);

  if (useNumbers) addCharacters(numArr, false);

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
// Reconfigure function to use user's character length when words are selected
// Style copy to clipboard button
// Add password tips to page layout
// Style reset form