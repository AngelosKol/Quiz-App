export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
export function choicesHandler(choices, question, answersArray) {
  choices.forEach((choice, i) => {
    choice.innerText = `${answersArray[i]}`;
    choice.addEventListener("click", () => {
      if (choice.innerText === question.correctAnswer) {
        this.correctAnswers++;
        console.log(this.correctAnswers);
        choice.classList.add("correct");
      } else {
        choice.classList.add("incorrect");
        choice.classList.add("disabled");
      }
      choices.forEach((choice) => {
        choice.removeEventListener("click", () => {});
      });
    });
  });
}
