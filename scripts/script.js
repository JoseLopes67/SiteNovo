

const options = {
  "Ferrari": {
    hint: "Marca de carros desportivos italiana",
    image: "/images/ferrari-488-pista-main.png" 
  },
  "Bentley": {
    hint: "Marca de carros de luxo inglesa",
    image: "/images/Bentley.png"
  },
  "Porsche": {
    hint: "Marca de carros desportivos alemã",
    image: "/images/Gt3.png"
  },
  "AstonMartin": {
    hint: "Marca de carros de desportivos inglesa",
    image: "/images/AstonMartin.png"
  },
  "BMW": {
    hint: "Marca de carros de desportivos Alemã",
    image: "/images/BMW.png"
  },
  "Audi": {
    hint: "Marca de carros Alemã",
    image: "/images/Audi.png"
  },
  "Ford": {
    hint: "Marca de carros dos EUA",
    image: "/images/Mustang.png"
  },
  "Mercedes": {
    hint: "Marca de carros de semi-luxo Alemã",
    image: "/images/Mercedes.png"
  },
  "Toyota": {
    hint: "Marca de carros japonesa",
    image: "/images/Supra.png"
  },
  "Peugeot": {
    hint: "Marca de carros mais antiga",
    image: "/images/Peugeot.png"
  },
  "McLaren": {
    hint: "Marca de carros de super-desportivos inglesa",
    image: "/images/mclaren-570s_main.png"
  },
  "Nissan": {
    hint: "Marca de carros de japonesa",
    image: "/images/GTR_Nismo.png"
  },

};






const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.getElementById("controls");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "", randomHint = "", randomImage = "";
let winCount = 0, lossCount = 0;
let usedWords = [];

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach(button => button.disabled = true);
  stopGame();
};

// Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

// Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};

// Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";

  // Reset used words if all words have been used
  if (usedWords.length === words.length) {
    usedWords = [];
  }

  // Select a new word that hasn't been used yet
  let randomIndex;
  do {
    randomIndex = generateRandomValue(words);
  } while (usedWords.includes(randomIndex));

  usedWords.push(randomIndex);
  randomWord = words[randomIndex];
  const randomOption = options[randomWord];
  randomHint = randomOption.hint;
  randomImage = randomOption.image;

  hintRef.innerHTML = `
    <div id="wordHint"><span>Hint: </span>${randomHint}</div>
    <div id="wordImage"><img src="${randomImage}" alt="Imagem de ${randomWord}" /></div>
  `;

  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  // Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    // Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    // Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      // If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            // Replace dash with letter
            inputSpace[index].innerText = char;
            // increment counter
            winCount += 1;
            // If winCount equals word length
            if (winCount == charArray.length) {
              
              startBtn.innerText = "Next car!";
              // block all buttons
              blocker();
            }
          }
        });
      } else {
        // lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }

      // Disable clicked buttons
      button.disabled = true;
    });

    // Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  controls.classList.remove("hide");
};