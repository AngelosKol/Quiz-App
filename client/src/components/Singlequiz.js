import QuestionsApi from "../services/QuestionsApi";
import { shuffleArray, handleReturn } from "../utils";

class Singlequiz {
  constructor() {
    this.div = document.querySelector(".container");
    this.header = document.querySelector("header");
    this._questions = [];
    this.correctAnswers = 0;
  }

  async startQuiz() {
    try {
      const response = await QuestionsApi.getQuestions();
      this._questions = response;
      console.log(this._questions);
    } catch (error) {
      console.log(error);
    }
  }

  //return button handler &  next button handler
  addEventListeners() {
    this._returnBtn.addEventListener("click", handleReturn.bind(this));
    this._nextButton.addEventListener(
      "click",
      this.nextButtonHandler.bind(this)
    );
  }

  //Change question & answers on next button click
  nextButtonHandler() {
    const question = this._questions[Math.floor(Math.random() * 380)];
    const answers = [question.correctAnswer].concat(question.incorrectAnswers);
    shuffleArray(answers);
    this.changeQuestion(question, answers);
  }

  changeQuestion(question, answersArray) {
    const heading = document.getElementById("question");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    choices.forEach((choice) => {
      choice.removeEventListener("click", () => {});
    });

    heading.innerHTML = `${question.question}`;
    //choicesHanlder renders choices with answers & add correct/incorrect classes
    this.choicesHandler(choices, question, answersArray);
    //remove all classes from the choices
    choices.forEach((choice) => {
      choice.classList.remove("correct");
      choice.classList.remove("incorrect");
      choice.classList.remove("disabled");
    });
  }
  choicesHandler(choices, question, answersArray) {
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
      });
    });
  }

  async render() {
    await this.startQuiz();
    const question = this._questions[Math.floor(Math.random() * 500)];
    const answers = [question.correctAnswer].concat(question.incorrectAnswers);
    shuffleArray(answers);
    this.header.style.display = "none";
    this.div.classList.add("flex-simple");
    this.div.innerHTML = `
    <div class="quiz-container">
    <h2 id="question">${question.question}</h2>
    <div class="choice-container">
      <p class="choice-prefix">A</p>
      <p class="choice-text" data-number="1"></p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">B</p>
      <p class="choice-text" data-number="2"></p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">C</p>
      <p class="choice-text" data-number="3"></p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">D</p>
      <p class="choice-text" data-number="4"></p>
    </div>
  </div>
  <div class="btn-container">
  <button class="btn" id="return">Return</button>
  <button class="btn" id="next">Next</button>
  </div>
  
  </div>
   `;
    this._returnBtn = document.getElementById("return");

    this._nextButton = document.querySelector("#next");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    this.choicesHandler(choices, question, answers);
    this.addEventListeners();
  }
}

export default Singlequiz;
