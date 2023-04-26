export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function handleReturn() {
  this.div.classList.remove("flex-simple");
  this.div.innerHTML = "";
  this.header.style.display = "flex";
}

// method for giviing feedback to the user by adding classes to the choices

export function choicesHandler(choices, question, answersArray) {
  let answered = false;
  let correctIndex = answersArray.indexOf(question.correctAnswer);

  choices.forEach((choice, i) => {
    choice.innerText = `${answersArray[i]}`;
    choice.addEventListener("click", () => {
      if (!answered) {
        // only execute this code if the user hasn't answered the question yet
        answered = true;
        if (choice.innerText === question.correctAnswer) {
          choice.classList.add("correct");
        } else {
          choice.classList.add("incorrect");
          choice.classList.add("disabled");
          choices[correctIndex].classList.add("correct");
        }
      }
      choice.classList.add("selected");
    });
  });
}

export function changeQuestion(question, answersArray) {
  const heading = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  choices.forEach((choice) => {
    choice.removeEventListener("click", () => {});
  });

  heading.innerHTML = question.question;
  //choicesHanlder renders choices with answers & add correct/incorrect classes
  choicesHandler(choices, question, answersArray);
  //remove all classes from the choices
  choices.forEach((choice) => {
    choice.classList.remove("correct");
    choice.classList.remove("incorrect");
    choice.classList.remove("disabled");
    choice.classList.remove("selected");
  });
}
