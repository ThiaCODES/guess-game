//declaring of variables
const guessValue = document.querySelector("input");
const guessBtn = document.querySelector("button");
const message = document.querySelector(".message");
const maxNumber = document.getElementById("max");
const minNumber = document.getElementById("min");
const hint = document.querySelector(".hint");

let min = 1;
max = 20;
winningnumber = getRandomNumber(min, max);
guessAttempt = 5;
maxNumber.innerHTML = max;
minNumber.innerHTML = min;

//generate random number within the range of min and max

function getRandomNumber(min, max) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

// Click and compare the users value to the winning number to see if the user get it right
guessBtn.addEventListener("click", () => {
  const guess = Number(guessValue.value);
  console.log(guess);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} - ${max}`);
  } else {
    if (guess === winningnumber) {
      guessBtn.style.background = "green";
      gameover(true, `Your guess is correct. <br>Congratulations! You won. `);
      hint.innerHTML = " ";
    } else {
      guessAttempt -= 1;

      if (guessAttempt <= 0) {
        gameover(
          false,
          `Game Over! <br>The correct number is ${winningnumber}`,
          (hint.innerHTML = " ")
        );
      } else {
        guessBtn.style.background = "red";
        setMessage(
          `Your guess of ${guessValue.value} is incorrect. <br> You have ${guessAttempt} attempt left`,
          "red"
        );
        hintMessage(guess);
      }
    }
  }
});

//function that ends and restart the game
function gameover(won, mes) {
  //win and attemp over
  won === true ? (color = "green") : (color = "red");
  setMessage(mes, color);
  guessValue.disabled = true;
  guessBtn.innerHTML = "Play again";
  guessBtn.addEventListener("mousedown", () => {
    window.location.reload(true);
  });
}
function setMessage(mes, color) {
  message.innerHTML = mes;
  message.style.color = color;
}
function hintMessage(guess) {
  if (guess > winningnumber) {
    hint.innerHTML = "Hint: Your guess is too high";
  } else if (guess < winningnumber) {
    hint.innerHTML = "Hint: Your guess is too low";
  } else {
    hint.innerHTML = "";
  }
}
