const upperWords = ["adventurous", "amazing", "aqua", "beautiful", "beige", "black", "blue", "blissful", "brown", "bougie", "burgundy", "charming", "clever", "coral", "crimson", "daring", "delightful", "dazzling", "elegant", "energetic", "fantastic", "fascinating", "friendly", "gorgeous", "graceful", "green", "harmonious", "happy", "incredible", "intelligent", "inventive", "ivory", "joyful", "kind", "kinetic", "lavender", "lilac", "lovely", "lively", "magnificent", "magenta", "maroon", "noble", "nice", "optimistic", "outstanding", "peaceful", "playful", "quick", "radiant", "red", "running", "silver", "sincere", "talented", "teal", "tranquil", "unique", "understanding", "valuable", "vibrant", "white", "wonderful", "witty", "youthful", "yellow", "zealous"]
const lowerWords = ["Air", "Airplane", "Appliance", "Apple", "Basement", "Bathtub", "Bed", "Book", "Brush", "Cabinet", "Car", "Chair", "City", "Classroom", "Clock", "Coffee", "Computer", "Cup", "Curtain", "Desk", "Dog", "Dolphin", "Door", "Drawer", "Earthquake", "Elevator", "Elephant", "Faucet", "Floor", "Flower", "Fork", "Food", "Friend", "Glass", "Hat", "Heart", "House", "Key", "Lamp", "Lemon", "Light", "Lime", "Mirror", "Movie", "Music", "Ocean", "Paper", "Pen", "Pear", "Phone", "Pineapple", "Plate", "Pot", "River", "Rug", "School", "Scissors", "Shelf", "Shirt", "Shoe", "Sink", "Soap", "Sock", "Spoon", "Suitcase", "Sun", "Table", "Telephone", "Time", "Toothbrush", "Train", "Treadmill", "Vase", "Window"]
const special = ["?", "!", "@", "#", "$", "%", "&", "*"]
const numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let passwordLength = 0;
let useWords = false;
let useSpecial = false;
let useNumbers = false;
let useUpper = false;''
let useLower = false;
let isFirstClick = true;

const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#resetBtn");
const container = document.querySelector("#card");

const wordsCheckbox = document.querySelector("#words");
const upperCheckbox = document.querySelector("#upper");
const specialCheckbox = document.querySelector("#special");
const numbersCheckbox = document.querySelector("#numbers");

wordsCheckbox.addEventListener("change", () => {
  console.log(`'Use Words' checkbox checked: ${wordsCheckbox.checked}`);
});

upperCheckbox.addEventListener("change", () => {
  console.log(`Use Upper checkbox checked: ${upperCheckbox.checked}`);
});

specialCheckbox.addEventListener("change", () => {
  console.log(`Use Special checkbox checked: ${specialCheckbox.checked}`);
});

numbersCheckbox.addEventListener("change", () => {
  console.log(`Use Numbers checkbox checked: ${numbersCheckbox.checked}`);
});

const getRandomCharacter = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const generatePassword = event => {
  console.log('Generating password...');
  if (event) {
    event.preventDefault();
  }

  // const useExactLength = document.querySelector("#useExact").checked;
  // const useWords = document.querySelector("#words").checked;
  // const useSpecial = document.querySelector("#special").checked;
  // const useNumbers = document.querySelector("#numbers").checked;
  // const useUpper = document.querySelector("#upper").checked;
  // const passwordLengthInput = document.querySelector("#length");
  // const passwordLength = parseInt(passwordLengthInput.value, 10);

  const selectedCharacters = [];
  let password = "";

  const addCharacters = (arr, isWord) => {
    if ((!useWords || (useWords && isWord)) && password.length < passwordLength) {
      while (arr.length > 0) {
        console.log(`Entering loop. Current password:`, password);
        let randomChar = getRandomCharacter(arr);
  
        console.log(`randomChar.length:`, randomChar.length);
        console.log(`password.length:`, password.length);
        console.log('passwordLength', passwordLength);
  
        if (randomChar.length + password.length <= passwordLength) {
          console.log(`Adding ${isWord ? 'word' : 'char'} to password:`, randomChar);
          selectedCharacters.push(randomChar);
          password += randomChar;
        } else {
          break;
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
  const target = event.target;

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

// const copyText = () => {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  window.getSelection().removeAllRanges();
// }

const generatePassForm = document.querySelector("#generatePassForm");
generatePassForm.addEventListener("submit", function (event) {
  console.log('Form submission event triggered.');
  writePassword(event);
});
}};

// Future development:
// Refactor generatePassword function
// Option for standard password with words or characters only for more security
// Reconfigure function to use user's character length when words are selected
// add failsafe passwords in the event user's length is unattainable
// build passwords in lowerwords, upperwords then numbers and symbols order
// if addWords is chosen, see about changing s's to $ etc.
// Add password tips to page layout, include hacking timeline chart
// Add option for pass phrase?