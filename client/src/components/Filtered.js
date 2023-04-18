import QuestionsApi from "../services/QuestionsApi";
import Singlequiz from "./Singlequiz";

class Filtered {
  constructor() {
    this.div = document.querySelector(".container");
    this._questions = [];
    this._categories = [];
    this.singlequiz = new Singlequiz();
  }

  addEventListeners() {
    this._submitBtn.addEventListener("click", this.renderQuestions.bind(this));
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

  choicesHandler() {
    choices.forEach((choice, i) => {
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

  //Renders the first five questions that match the filter criteria

  async renderQuestions() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const response = await QuestionsApi.getQuestions(category, difficulty);
    this._questions = response;
    // Filter questions based on selected category and difficulty
    const filteredQuestions = this._questions
      .filter((question) => {
        return (
          (!category || question.category === category) &&
          (!difficulty || question.difficulty === difficulty)
        );
      })
      .slice(0, 5);
    // Render the first five questions that match the filter criteria
    let html = "";
    this.div.classList.add("flex-simple");

    filteredQuestions.forEach((question, i) => {
      const answers = [question.correctAnswer].concat(
        question.incorrectAnswers
      );
      console.log(answers);

      this.singlequiz.shuffleArray(answers);
      console.log(answers);
      html += `
        <div class="quiz-container">
          <h2 id="question">${question.question}</h2>
          <p>Category: ${question.category}</p>
          <p>Difficulty: ${question.difficulty}</p>
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
      `;
    });

    this.div.innerHTML = html;
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
    this.addEventListeners();
  }
}

export default Filtered;
