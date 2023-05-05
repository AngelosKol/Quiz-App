import QuestionsApi from "../services/QuestionsApi";

import {
  shuffleArray,
  handleReturn,
  choicesHandler,
  changeQuestion,
} from "../utils";
class Filtered {
  constructor() {
    this.div = document.querySelector(".container");
    this.header = document.querySelector(".header");
    this.filterPlayBtn = document.getElementById("filter-mode");
    this.filterPlayBtn.addEventListener("click", this.renderForm.bind(this));

    this._questions = [];
    this._categories = [
      "Science",
      "Geography",
      "Food & Drink",
      "Arts & Literature",
      "Sport & Leisure",
      "Society & Culture",
      "General Knowledge",
      "Music",
      "History",
      "Film & TV",
    ];
  }

  nextButtonHandler() {
    const choices = Array.from(document.getElementsByClassName("choice-text"));

    if (!choices.some((choice) => choice.classList.contains("selected"))) {
      // if no choice is selected, disable the Next button and return
      this._nextButton.classList.add("disabled");
      return;
    }

    this._currentIndex++;
    const question = this._questions[this._currentIndex];
    console.log(this._currentIndex);
    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    shuffleArray(answers);

    if (this._currentIndex < this._questions.length - 1) {
      changeQuestion(question, answers);
    } else {
      this._nextButton.classList.add("disabled");
    }
  }

  async renderQuestions() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    const response = await QuestionsApi.getQuestions(category, difficulty);

    this._questions = response;
    console.log(this._questions);

    this._currentIndex = 0;
    const question = this._questions[this._currentIndex];
    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    shuffleArray(answers);
    this.div.classList.add("flex-simple");
    this.header.style.display = "none";

    this.div.innerHTML = `
      <div class="quiz-container">
        <h2 id="question">${question.question}</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text" data-number="1">${answers[0]}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text" data-number="2">${answers[1]}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text" data-number="3">${answers[2]}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text" data-number="4">${answers[3]}</p>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn" id="return">Return</button>
        <button class="btn" id="next">Next</button>
      </div>
    `;

    this._returnBtn = document.getElementById("return");
    this._nextButton = document.querySelector("#next");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    choicesHandler(choices, question, answers);
    this._returnBtn.addEventListener("click", handleReturn.bind(this));
    this._nextButton.addEventListener(
      "click",
      this.nextButtonHandler.bind(this)
    );
  }

  //Renders the form for filtering questions
  async renderForm() {
    console.log(this._categories);
    this.div.innerHTML = `
        <form>
        <label for="category">Category:</label>
        <select name="category" id="category">
          <option value="">--Select category--</option>
          ${this._categories
            .filter((category) => category !== undefined)
            .map(
              (category) => `<option value="${category}">${category}</option>`
            )
            .join("")} 
                   </select>
        <br>
        <label for="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty">
          <option value="">--Select difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br>
        <button type="button" id="filterBtn">Filter</button>
      </form>`;
    this._submitBtn = document.getElementById("filterBtn");
    this._submitBtn.addEventListener("click", this.renderQuestions.bind(this));
  }
}

export default Filtered;
