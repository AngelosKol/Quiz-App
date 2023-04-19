import QuestionsApi from "../services/QuestionsApi";
import { shuffleArray } from "../utils";
class Filtered {
  constructor() {
    this.div = document.querySelector(".container");
    this.header = document.querySelector(".header");

    this._questions = [];
    this._categories = [];
  }

  async getCategory() {
    try {
      const response = await QuestionsApi.getQuestions();
      const categories = response.map((question) => {
        return question.category;
      });
      this._categories = [...new Set(categories)];
    } catch (error) {
      console.log(error);
    }
  }
  handleReturn() {
    this.div.classList.remove("flex-simple");
    this.div.innerHTML = "";
    this.header.style.display = "flex";
  }
  //Renders the first five questions that match the filter criteria
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
    console.log(answers);
    this.div.classList.add("flex-simple");
    this.header.style.display = "none";

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
    `;
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    this.choicesHandler(choices, question, answers);

    this._returnBtn = document.getElementById("return");
    this._nextButton = document.querySelector("#next");

    this._returnBtn.addEventListener("click", this.handleReturn.bind(this));
    this._nextButton.addEventListener("click", () => {
      if (this._currentIndex < this._questions.length - 1) {
        this._currentIndex++;
        this.showQuestion();
      } else {
        this._nextButton.classList.add("disabled");
      }
    });
  }

  showQuestion() {
    const question = this._questions[this._currentIndex];
    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    shuffleArray(answers);

    const questionText = document.getElementById("question");
    const choiceTexts = document.querySelectorAll(".choice-text");

    questionText.innerText = question.question;
    choiceTexts.forEach((choice) => {
      choice.classList.remove("correct");
      choice.classList.remove("incorrect");
      choice.classList.remove("disabled");
    });
    this.choicesHandler(choiceTexts, question, answers);
  }
  choicesHandler(choices, question, answersArray) {
    choices.forEach((choice, i) => {
      choice.innerText = `${answersArray[i]}`;
      choice.addEventListener("click", () => {
        if (choice.innerText === question.correctAnswer) {
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
  //Renders the form for filtering questions
  async renderForm() {
    await this.getCategory();
    this.div.innerHTML = `
        <form>
        <label for="category">Category:</label>
        <select name="category" id="category">
          <option value="">--Select category--</option>
          ${this._categories
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
