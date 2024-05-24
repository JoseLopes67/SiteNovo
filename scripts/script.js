

const options = {
  "Ferrari": {
    hint: "Marca de carros desportivos italiana",
    image: "https://res.cloudinary.com/unix-center/image/upload/c_lfill,dpr_3.0,f_auto,fl_progressive,g_center,h_108,q_auto:good,w_270/v1478980623/xr82bubcz2o9qxwsegyt.png" 
  },
  "Bentley": {
    hint: "Marca de carros de luxo inglesa",
    image: "https://picolio.auto123.com/15photo/bentley/2015-bentley-mulsanne_1.png"
  },
  "Porsche": {
    hint: "Marca de carros desportivos alemã",
    image: "https://cut-images.roadster.com/evox/color_1280_001_png/14871/14871_cc1280_001_0L.png"
  },
  "AstonMartin": {
    hint: "Marca de carros de desportivos inglesa",
    image: "https://img.sm360.ca/ir/w600h340c/images/newcar/ca/2023/aston-martin/dbs-coupe/base-dbs/coupe/exteriorColors/2023_aston-martin_dbs-coupe_001_c47.png"
  },
  "BMW": {
    hint: "Marca de carros de desportivos Alemã",
    image: "https://picolio.auto123.com/17photo/bmw/2017-bmw-m3.png",
  "Audi": {
    hint: "Marca de carros Alemã",
    image: "https://bluesky-cogcms-prodb.cdn.imgeng.in/media/f2tnxydx/rs6-avant.png"
  },
  "Ford": {
    hint: "Marca de carros dos EUA",
    image: "https://static.tcimg.net/vehicles/primary/d79aab180bfdcad5/2024-Ford-Mustang-silver-full_color-driver_side_profile.png"
  },
  "Mercedes": {
    hint: "Marca de carros de semi-luxo Alemã",
    image: "https://www.dursun-limousine.ch/media/cache/61794a5e502502e381ffc10fb653f8e2fd0d88b0.png"
  },
  "Toyota": {
    hint: "Marca de carros japonesa",
    image: "https://media.dealervenom.com/jellies/Toyota/GR%20Supra/C446076_D13_Side.png?auto=compress%2Cformat"
  },
  "Peugeot": {
    hint: "Marca de carros mais antiga",
    image: "https://getrentacar.com/storage/cache/images/470-246-75-fit-187953.webp"
  },
  "McLaren": {
    hint: "Marca de carros de super-desportivos inglesa",
    image: "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/25690e95-ccd6-4f80-bb0e-f0e2011bad2f/6e1daf72-92eb-41f8-9d78-df2c892974af.png"
  },
  "Nissan": {
    hint: "Marca de carros de japonesa",
    image: "https://media.assets.ansira.net/websites/content/cblt-ms-nissan/about_messages/68c346c6f09d42139a899530e93da30c_c2x0-596x337.png"
  },

  }





}
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